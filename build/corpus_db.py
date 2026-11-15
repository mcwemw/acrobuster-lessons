#!/usr/bin/env python3
"""IR + DB layer for the ACROBUSTER corpus.

Indexes every lesson card (cards/*.md) and note (notes_md/*.md) into a SQLite
database with an FTS5 full-text index, so the growing corpus becomes queryable
with real ranked retrieval (BM25) instead of client-side substring matching.

- Source of truth = the .md files (UNTOUCHED). This only reads them.
- corpus.db (this dir) = queryable mirror: `docs` (metadata) + `fts` (FTS5, BM25).

Usage:
  python build/corpus_db.py                 # (re)build corpus.db from cards + notes
  python build/corpus_db.py query "<terms>" # ranked full-text search (BM25)
  python build/corpus_db.py query "<terms>" --tag 模型原理 -n 10
  python build/corpus_db.py stats           # per-tag / per-type counts + link graph size
"""
import os, re, sys, sqlite3, glob

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DB = os.path.join(HERE, "corpus.db")

def parse_frontmatter(text):
    meta, body = {}, text
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if m:
        body = m.group(2)
        for line in m.group(1).splitlines():
            mm = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
            if mm:
                k, v = mm.group(1), mm.group(2).strip()
                if len(v) >= 2 and v[0] == '"' and v[-1] == '"':
                    v = v[1:-1].replace('\\"', '"')
                meta[k] = v
    return meta, body

def plain(body):
    """Strip md/HTML to searchable plain text."""
    t = body
    t = re.sub(r":::\s*\w+", " ", t)                 # ::: en / ::: src fences
    t = re.sub(r":::", " ", t)
    t = re.sub(r"\[\[[^|\]]*\|([^\]]*)\]\]", r"\1", t)  # [[slug|text]] -> text
    t = re.sub(r"\[\[([^\]]*)\]\]", r"\1", t)
    t = re.sub(r"<[^>]+>", " ", t)                   # html tags
    t = re.sub(r"[#*`>]", " ", t)                    # md punctuation
    t = re.sub(r"\s+", " ", t)
    return t.strip()

def links_of(body):
    return sorted(set(re.findall(r"\[\[([0-9]+-[a-z0-9-]+)", body)))

def collect():
    docs = []
    for p in sorted(glob.glob(os.path.join(ROOT, "cards", "*.md"))):
        meta, body = parse_frontmatter(open(p, encoding="utf-8").read())
        docs.append({
            "id": meta.get("id", ""), "type": "card",
            "slug": meta.get("slug", os.path.basename(p)[:-3]),
            "file": f"lessons/{meta.get('id','')}-{meta.get('slug','')}.html",
            "tag": meta.get("tag", "未分類"),
            "title": (meta.get("title", "") + " " + meta.get("title_en", "")).strip(),
            "summary": (meta.get("summary", "") + " " + meta.get("summary_en", "")).strip(),
            "body": plain(body), "links": ",".join(links_of(body)),
        })
    for p in sorted(glob.glob(os.path.join(ROOT, "notes_md", "*.md"))):
        meta, body = parse_frontmatter(open(p, encoding="utf-8").read())
        docs.append({
            "id": meta.get("date", ""), "type": "note",
            "slug": os.path.basename(p)[:-3], "file": "notes.html",
            "tag": meta.get("tag", "未分類"),
            "title": (meta.get("title", "") + " " + meta.get("title_en", "")).strip(),
            "summary": meta.get("source", ""),
            "body": plain(body), "links": ",".join(links_of(body)),
        })
    return docs

def build():
    docs = collect()
    con = sqlite3.connect(DB); cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS docs")
    cur.execute("""CREATE TABLE docs(id TEXT, type TEXT, slug TEXT PRIMARY KEY,
                   file TEXT, tag TEXT, title TEXT, summary TEXT, body TEXT, links TEXT)""")
    cur.executemany("INSERT OR REPLACE INTO docs VALUES (:id,:type,:slug,:file,:tag,:title,:summary,:body,:links)", docs)
    cur.execute("DROP TABLE IF EXISTS fts")
    # external-content FTS5 keyed to docs.rowid via slug order
    cur.execute("CREATE VIRTUAL TABLE fts USING fts5(slug UNINDEXED, tag, title, summary, body, tokenize='unicode61')")
    cur.executemany("INSERT INTO fts(slug,tag,title,summary,body) VALUES (:slug,:tag,:title,:summary,:body)", docs)
    con.commit()
    n_card = sum(1 for d in docs if d["type"] == "card")
    n_note = sum(1 for d in docs if d["type"] == "note")
    print(f"built {DB}: {n_card} cards + {n_note} notes = {len(docs)} docs indexed (FTS5/BM25)")
    con.close()

def query(terms, tag=None, n=8):
    if not os.path.exists(DB):
        build()
    con = sqlite3.connect(DB); cur = con.cursor()
    # weight title>summary>body via bm25 column weights
    sql = ("SELECT f.slug, d.type, d.tag, d.title, d.file, "
           "bm25(fts, 0.0, 2.0, 10.0, 5.0, 1.0) AS score "
           "FROM fts f JOIN docs d ON d.slug=f.slug WHERE fts MATCH ? ")
    args = [terms]
    if tag:
        sql += "AND d.tag=? "; args.append(tag)
    sql += "ORDER BY score LIMIT ?"; args.append(n)
    rows = cur.execute(sql, args).fetchall()
    if not rows:
        print(f"no matches for: {terms}" + (f" (tag={tag})" if tag else "")); return
    print(f"top {len(rows)} for “{terms}”" + (f" in [{tag}]" if tag else "") + " (BM25, title-weighted):\n")
    for slug, typ, tg, title, file, score in rows:
        title = re.sub(r"\s+", " ", title)[:70]
        print(f"  [{typ:4}|{tg}] {title}\n        {file}  (score {score:.2f})")
    con.close()

def stats():
    if not os.path.exists(DB):
        build()
    con = sqlite3.connect(DB); cur = con.cursor()
    print("per type:", dict(cur.execute("SELECT type,count(*) FROM docs GROUP BY type").fetchall()))
    print("per tag :")
    for tag, c in cur.execute("SELECT tag,count(*) AS c FROM docs GROUP BY tag ORDER BY c DESC").fetchall():
        print(f"    {c:3}  {tag}")
    edges = sum(len(l.split(",")) for (l,) in cur.execute("SELECT links FROM docs WHERE links!=''").fetchall())
    print(f"cross-links (wikilink edges): {edges}")
    con.close()

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "build":
        build()
    elif a[0] == "query":
        rest = a[1:]; tag = None; n = 8; terms = []
        i = 0
        while i < len(rest):
            if rest[i] == "--tag" and i + 1 < len(rest): tag = rest[i+1]; i += 2
            elif rest[i] in ("-n", "--n") and i + 1 < len(rest): n = int(rest[i+1]); i += 2
            else: terms.append(rest[i]); i += 1
        query(" ".join(terms), tag, n)
    elif a[0] == "stats":
        stats()
    else:
        print(__doc__)
