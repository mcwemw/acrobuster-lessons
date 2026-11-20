#!/usr/bin/env python3
"""每日論文筆記 notes_md/*.md → notes.html(文字+圖) + content/notes.js 索引。

重用 build.py 的 section/行內解析。每篇筆記的康乃爾四色「文字」現在是 md,
可搜尋、可重用、Obsidian 可編;PNG 作為附圖。新的最前面(newest-first,依 date 反排)。

用法: build_notes.py [notes_md_dir] [out_dir]   預設 notes_md/ → out/
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build  # render_body / inline / parse_frontmatter

ROOT = os.path.dirname(os.path.abspath(__file__))

PAGE_HEAD = """<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>每日論文筆記 · Daily Paper Notes — ACROBUSTER</title>
<link rel="stylesheet" href="assets/style.css">
<style>
  .filterbar{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 12px}
  .filterbar button{font:inherit;cursor:pointer;border:1px solid #c8cedd;background:#fff;
    color:#182046;border-radius:999px;padding:5px 13px;line-height:1.3;transition:.15s}
  .filterbar button .en{opacity:.6;font-size:.82em;margin-left:3px}
  .filterbar button .n{opacity:.5;font-size:.82em;margin-left:5px}
  .filterbar button:hover{border-color:#182046}
  .filterbar button.active{background:#182046;color:#fff;border-color:#182046}
  .searchbar{margin:14px 0 12px;position:relative}
  .searchbar input{width:100%;box-sizing:border-box;font:inherit;padding:10px 38px 10px 14px;
    border:1px solid #c8cedd;border-radius:10px;color:#182046}
  .searchbar input:focus{outline:none;border-color:#182046}
  .searchbar .clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);
    border:0;background:none;cursor:pointer;font-size:1.1em;color:#8a90a0;display:none}
  .searchbar .clear.show{display:block}
  .noresult{opacity:.6;margin:18px 2px;display:none}
  .note{margin-bottom:34px;padding-bottom:10px;border-bottom:1px solid var(--line)}
  .note .note-tag{display:inline-block;margin-top:8px;font-size:.82em;cursor:pointer;
    border:1px solid #c8cedd;border-radius:999px;padding:2px 10px;color:#182046}
  .note details{margin-top:12px}.note summary{cursor:pointer;opacity:.75}
</style>
</head>
<body>
<header class="site">
  <div class="wrap">
    <h1><span class="ac">AC</span><span class="ro">ROBUST</span>er · 每日論文筆記 Daily Paper Notes</h1>
    <p>每天從 Zotero 書庫挑一篇論文，做成康乃爾四色筆記 · One paper a day, as a Cornell-style note</p>
  </div>
</header>
<main>
  <p><a href="index.html">← 回研究講義站 Back to lessons</a></p>
  <p>每天自動更新、不重複。每條主張可回源論文 abstract；筆記內文可搜尋。
     <span class="en">Auto-updated daily; every claim traces to the paper's abstract; note text is searchable.</span></p>
  <div class="searchbar">
    <input id="search" type="search" autocomplete="off"
           placeholder="搜尋關鍵字 Search (標題 / 內文 / 來源 / 標籤)…" aria-label="搜尋筆記 Search notes">
    <button class="clear" id="searchclear" type="button" aria-label="清除 Clear">×</button>
  </div>
  <div class="filterbar" id="filterbar"></div>
  <div id="notes">
"""

PAGE_TAIL = """  </div>
  <p class="noresult" id="noresult">沒有符合的筆記 No matching notes — 換個關鍵字或按「全部」。</p>
</main>
<footer class="site">ACROBUSTER · 内容為作者原創導讀 Original digests · 言而有據 Grounded</footer>
<script>
  var TAG_EN = {"RAG":"RAG","AI 工程":"AI engineering","提示工程":"prompt engineering",
    "代理工程":"agent engineering","模型原理":"how models work","軟體工程":"software engineering","未分類":"untagged"};
  var activeTag="all", query="";
  function applyFilters(){
    var terms=query?query.split(/\\s+/).filter(Boolean):[]; var shown=0;
    document.querySelectorAll("#notes .note").forEach(function(n){
      var tagOK=(activeTag==="all"||n.dataset.tag===activeTag);
      var textOK=terms.every(function(t){return n.dataset.search.indexOf(t)!==-1;});
      var vis=tagOK&&textOK; n.style.display=vis?"":"none"; if(vis)shown++;
    });
    document.querySelectorAll("#filterbar button").forEach(function(b){b.classList.toggle("active",b.dataset.tag===activeTag);});
    document.getElementById("noresult").style.display=shown?"none":"block";
    document.getElementById("searchclear").classList.toggle("show",!!query);
  }
  (function(){
    var order=[],count={};
    document.querySelectorAll("#notes .note").forEach(function(n){var t=n.dataset.tag;if(!(t in count)){order.push(t);count[t]=0;}count[t]++;});
    var bar=document.getElementById("filterbar");
    function mk(tag,zh,en,nn){var b=document.createElement("button");b.dataset.tag=tag;
      b.innerHTML=zh+(en?'<span class="en">'+en+'</span>':'')+'<span class="n">'+nn+'</span>';
      b.onclick=function(){activeTag=tag;applyFilters();};bar.appendChild(b);}
    mk("all","全部","All",document.querySelectorAll("#notes .note").length);
    order.forEach(function(t){mk(t,t,TAG_EN[t]||"",count[t]);});
    document.querySelectorAll("#notes .note-tag").forEach(function(c){c.addEventListener("click",function(){activeTag=c.dataset.tag;applyFilters();document.getElementById("filterbar").scrollIntoView({behavior:"smooth",block:"nearest"});});});
    var box=document.getElementById("search");
    box.addEventListener("input",function(){query=this.value.trim().toLowerCase();applyFilters();});
    document.getElementById("searchclear").addEventListener("click",function(){box.value="";query="";applyFilters();box.focus();});
    applyFilters();
  })();
</script>
</body>
</html>
"""


def strip_tags(h):
    return re.sub(r"<[^>]+>", "", h)


def esc_attr(s):
    return s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


_ANCHOR = re.compile(r'<a href="([^":/]+)\.html">(.*?)</a>', re.DOTALL)

# 概念 slug → 實際講義頁(當 note 的 [[slug]] 不是課卡 slug、但語意對得上某張卡時)。
ALIAS = {
    "delivery-verifier-discipline": "24-evaluate-the-evaluator",
}

class DeadLinkError(Exception):
    """note 連結解不到真頁 → 發佈前就該修根(補卡/補 alias),不靜默降級。"""


def resolve_note_links(html, out):
    """note 的 [[slug]] 會變 root 相對 <a href="slug.html">。但課卡頁在 lessons/NN-slug.html。
    依序把 note 連結解析成有效連結:
      1. ALIAS 明確對照 → lessons/<對照>.html
      2. 自動:lessons/*-<slug>.html 存在 → 指過去
      3. out/ 下同名 root 頁(index/notes)存在 → 保留
    解不到 → 收集後 raise DeadLinkError 中止 build。
    原則:遇到問題不是降級。死連要大聲報、逼人補真頁,絕不偷偷變純文字把 404 藏掉。
    """
    les_dir = os.path.join(out, "lessons")
    lesson_files = os.listdir(les_dir) if os.path.isdir(les_dir) else []
    dead = []
    def repl(m):
        slug, txt = m.group(1), m.group(2)
        if slug in ALIAS:
            return f'<a href="lessons/{ALIAS[slug]}.html">{txt}</a>'
        hit = next((f for f in lesson_files if f == f"{slug}.html"
                    or f.endswith(f"-{slug}.html")), None)
        if hit:
            return f'<a href="lessons/{hit}">{txt}</a>'
        if os.path.exists(os.path.join(out, f"{slug}.html")):
            return m.group(0)
        dead.append(slug)
        return m.group(0)
    html = _ANCHOR.sub(repl, html)
    if dead:
        uniq = sorted(set(dead))
        raise DeadLinkError(
            "note 連結解不到真頁(發佈會 404):\n  " + "\n  ".join(uniq) +
            "\n修法(擇一,不要降級):① 建對應課卡 cards/NN-<slug>.md;"
            "② 若語意對得上既有卡,在 build_notes.py 的 ALIAS 加對照;"
            "③ 真的不該連,就把 note md 裡的 [[...]] 改成純文字(人工決定,非 builder 自動)。")
    return html


def render_note(meta, body):
    tag = meta.get("tag", "未分類")
    sections = build.render_body(body)
    raw = (meta.get("date", "") + " " + meta.get("title", "") + " " +
           meta.get("title_en", "") + " " + meta.get("source", "") + " " +
           tag + " " + strip_tags(sections))
    search = esc_attr(re.sub(r"\s+", " ", raw).strip().lower())
    img = meta.get("img", "")
    fig = (f'    <details><summary>原卡圖 Card image</summary>'
           f'<p><img src="notes/{img}" alt="{esc_attr(meta.get("title",""))}" '
           f'style="width:100%;border:1px solid var(--line);border-radius:10px"></p></details>\n'
           if img else "")
    return (
        f'    <article class="note" data-tag="{tag}" data-search="{search}">\n'
        f'      <div class="id">{meta.get("date","")}</div>\n'
        f'      <h2 style="margin:4px 0 2px">{build.inline(meta.get("title",""))}'
        f'<span class="en">{build.inline(meta.get("title_en",""))}</span></h2>\n'
        f'      <div class="src">出處 Source：{build.inline(meta.get("source",""))}</div>\n'
        f'{sections}'
        f'{fig}'
        f'      <span class="note-tag" data-tag="{tag}">{tag}</span>\n'
        f'    </article>\n'
    )


def main(argv):
    nd = argv[0] if argv else os.path.join(ROOT, "notes_md")
    out = argv[1] if len(argv) > 1 else os.path.join(ROOT, "out")
    os.makedirs(os.path.join(out, "content"), exist_ok=True)
    notes = []
    for fn in os.listdir(nd):
        if fn.endswith(".md"):
            meta, body = build.parse_frontmatter(open(os.path.join(nd, fn), encoding="utf-8").read())
            notes.append((meta, body))
    notes.sort(key=lambda mb: mb[0].get("date", ""), reverse=True)  # newest first
    html = PAGE_HEAD + "".join(render_note(m, b) for m, b in notes) + PAGE_TAIL
    html = resolve_note_links(html, out)
    open(os.path.join(out, "notes.html"), "w", encoding="utf-8").write(html)
    idx = [{k: m.get(k, "") for k in ("date", "title", "title_en", "source", "img", "tag")}
           for m, _ in notes]
    open(os.path.join(out, "content", "notes.js"), "w", encoding="utf-8").write(
        "// 由 build_notes.py 從 notes_md/*.md 生成,勿手改。\nconst NOTES = " +
        json.dumps(idx, ensure_ascii=False, indent=2) + ";\n")
    print(f"built notes.html + content/notes.js  ({len(notes)} notes)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
