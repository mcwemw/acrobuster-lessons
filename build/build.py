#!/usr/bin/env python3
"""ACROBUSTER lessons — Markdown(+frontmatter) → 靜態站生成器（輕量自建, A）。

單一資料源 = cards/*.md（Obsidian 相容:YAML frontmatter + [[wikilinks]] + md 內文）。
一張卡一個 .md → 生成 lessons/<id>-<slug>.html + content/lessons.js 索引。
零外部框架、純 stdlib,輸出對齊現行手寫卡模板,方便漸進遷移。

用法: build.py [cards_dir] [out_dir]   預設 cards/ → out/
"""
import json, os, re, sys, html

ROOT = os.path.dirname(os.path.abspath(__file__))

# 三個固定 section 的英文副標(與現行模板一致);heading 以 " · " 分中英
# —— 作者在 md 寫「## 是什麼 · What it is」即可,生成器自動包 <span class="en">。

CARD_TMPL = """<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_short} — ACROBUSTER 研究講義站</title>
<link rel="stylesheet" href="../assets/style.css">
</head>
<body>
<header class="site">
  <div class="wrap"><h1><span class="ac">AC</span><span class="ro">ROBUST</span>er 研究講義站 · Research Lessons</h1></div>
</header>
<main>
  <a class="back" href="../index.html">← 回講義列表 Back to lessons</a>
  <article>
    <h1>{title}<span class="en">{title_en}</span></h1>
    <p class="summary">{summary}</p>
    <p class="summary en">{summary_en}</p>

{sections}  </article>
</main>
<footer class="site">ACROBUSTER · 内容為作者原創 Original content · 言而有據 Grounded</footer>
</body>
</html>
"""


# ---------- frontmatter（扁平 YAML,stdlib 手解,免依賴）----------
def parse_frontmatter(text):
    assert text.startswith("---"), "缺 frontmatter"
    _, fm, body = text.split("---", 2)
    meta = {}
    for line in fm.strip().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        k, v = line.split(":", 1)
        k, v = k.strip(), v.strip()
        if v.startswith("[") and v.endswith("]"):          # links: [a, b]
            inner = v[1:-1].strip()
            meta[k] = [x.strip().strip('"\'') for x in inner.split(",") if x.strip()]
        elif len(v) >= 2 and v[0] == '"' and v[-1] == '"':  # 雙引號:還原跳脫
            meta[k] = v[1:-1].replace('\\"', '"').replace("\\\\", "\\")
        elif len(v) >= 2 and v[0] == "'" and v[-1] == "'":
            meta[k] = v[1:-1]
        else:
            meta[k] = v                                     # 裸值
    return meta, body.strip("\n")


# ---------- 行內 md → html ----------
def inline(s):
    # [[slug|文字]] / [[slug]] → 同目錄相對連結(卡頁之間)
    def link(m):
        tgt = m.group(1).strip()
        txt = (m.group(2) or tgt).strip()
        return f'<a href="{tgt}.html">{txt}</a>'
    s = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", link, s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)   # 先粗體
    s = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", s)  # 再斜體
    return s   # 其餘(<span>/<br>/<code> 等行內 HTML)原樣穿透


# ---------- GFM 表格 → html ----------
def split_cells(line):
    """以 | 切欄,但保護 [[slug|文字]] 內的 |(暫代後還原)。"""
    s = line.strip().strip("|")
    s = re.sub(r"\[\[([^\]]*?)\]\]",
               lambda m: "[[" + m.group(1).replace("|", "\x00") + "]]", s)
    return [c.replace("\x00", "|") for c in s.split("|")]


def render_table(lines):
    def row(cells, tag):
        return "<tr>" + "".join(f"<{tag}>{inline(c.strip())}</{tag}>" for c in cells) + "</tr>"
    out = ["<table>", "<thead>", row(split_cells(lines[0]), "th"), "</thead>", "<tbody>"]
    for l in lines[2:]:
        out.append(row(split_cells(l), "td"))
    out += ["</tbody>", "</table>"]
    return "\n".join("          " + x for x in out)


# ---------- body → sections ----------
def render_body(body):
    # 以 "## " 切 section
    secs = re.split(r"(?m)^## ", body)
    html_secs = []
    for sec in secs:
        sec = sec.strip("\n")
        if not sec:
            continue
        head, *rest = sec.split("\n", 1)
        rest = rest[0] if rest else ""
        if " · " in head:
            zh, en = head.split(" · ", 1)
            h2 = f'{zh.strip()} <span class="en">· {en.strip()}</span>'
        else:
            h2 = head.strip()
        blocks = render_blocks(rest)
        html_secs.append(
            '    <section class="card">\n'
            f'      <h2>{h2}</h2>\n' + blocks + '    </section>\n'
        )
    return "\n".join(html_secs)


def render_blocks(text):
    lines = text.split("\n")
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1; continue
        # fenced div: ::: en / ::: src
        m = re.match(r"^::: (\w+)\s*$", line.strip())
        if m:
            kind = m.group(1); buf = []; i += 1
            while i < len(lines) and lines[i].strip() != ":::":
                buf.append(lines[i]); i += 1
            i += 1  # 跳過結尾 :::
            content = inline("\n".join(buf).strip())
            if kind == "en":
                out.append(f'      <p class="en">{content}</p>')
            elif kind == "src":
                out.append(f'      <div class="src">{content}</div>')
            else:
                out.append(f'      <div class="{kind}">{content}</div>')
            continue
        # 表格
        if line.strip().startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[-\s|:]+\|\s*$", lines[i+1]):
            tb = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                tb.append(lines[i]); i += 1
            out.append(render_table(tb)); continue
        # 原始 HTML 區塊穿透(以 < 開頭,如擷取保留的 <table>/<pre>/<p>…):
        # 收到對應收尾標籤為止(允許區塊內空行,如含空行的 <pre> 程式碼)
        if line.lstrip().startswith("<"):
            tagm = re.match(r"\s*<(\w+)", line)
            closer = f"</{tagm.group(1)}>" if tagm else None
            if closer and closer in line:          # 單行自閉
                out.append(line); i += 1; continue
            buf = [line]; i += 1
            while i < len(lines) and (closer is None or closer not in lines[i]):
                buf.append(lines[i]); i += 1
            if i < len(lines):
                buf.append(lines[i]); i += 1        # 收尾行
            out.append("\n".join(buf)); continue
        # 一般段落(連續非空行到空行為止)
        buf = []
        while i < len(lines) and lines[i].strip() and not lines[i].strip().startswith(":::") and not lines[i].strip().startswith("|"):
            buf.append(lines[i]); i += 1
        out.append(f'      <p>{inline(chr(10).join(buf))}</p>')
    return "\n".join(out) + "\n"


def build_card(md_path):
    meta, body = parse_frontmatter(open(md_path, encoding="utf-8").read())
    page = CARD_TMPL.format(
        title_short=meta.get("title_short", meta["title"]),
        title=inline(meta["title"]),
        title_en=inline(meta.get("title_en", "")),
        summary=inline(meta.get("summary", "")),
        summary_en=inline(meta.get("summary_en", "")),
        sections=render_body(body),
    )
    return meta, page


def main(argv):
    cards_dir = argv[0] if argv else os.path.join(ROOT, "cards")
    out_dir = argv[1] if len(argv) > 1 else os.path.join(ROOT, "out")
    les_dir = os.path.join(out_dir, "lessons")
    os.makedirs(les_dir, exist_ok=True)
    index = []
    for fn in sorted(os.listdir(cards_dir)):
        if not fn.endswith(".md"):
            continue
        meta, page = build_card(os.path.join(cards_dir, fn))
        out = os.path.join(les_dir, f'{meta["id"]}-{meta["slug"]}.html')
        open(out, "w", encoding="utf-8").write(page)
        index.append({k: meta.get(k, "") for k in
                      ("id", "slug", "title", "title_en", "summary", "summary_en", "tag")})
        print("built", os.path.relpath(out, ROOT))
    # content/lessons.js 索引
    os.makedirs(os.path.join(out_dir, "content"), exist_ok=True)
    js = ("// 由 build.py 從 cards/*.md 生成,勿手改。\nconst LESSONS = " +
          json.dumps(index, ensure_ascii=False, indent=2) + ";\n")
    open(os.path.join(out_dir, "content", "lessons.js"), "w", encoding="utf-8").write(js)
    print("built content/lessons.js  (%d cards)" % len(index))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
