#!/usr/bin/env python3
"""
wiki2slides.py — LLM Wiki page → teaching HTML slideshow (ACROBUSTER style)

Usage:
  python tools/wiki2slides.py wiki/pages/rag-lewis-2020.md
  python tools/wiki2slides.py wiki/pages/rag-lewis-2020.md --out genai/rag-lewis-2020.html
  python tools/wiki2slides.py wiki/pages/rag-lewis-2020.md --dry-run   # print plan only
  python tools/wiki2slides.py wiki/pages/rag-lewis-2020.md --model claude-haiku-4-5

Requires: pip install anthropic pyyaml
Env:      ANTHROPIC_API_KEY
"""

import sys, os, re, json, argparse
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("Missing: pip install pyyaml")


# ── 1. Parse wiki markdown ─────────────────────────────────────────────────

def parse_wiki(path: Path):
    text = path.read_text(encoding="utf-8")
    frontmatter = {}
    body = text

    m = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if m:
        frontmatter = yaml.safe_load(m.group(1)) or {}
        body = m.group(2)

    sections = []
    cur = None
    for line in body.splitlines():
        if line.startswith("## "):
            if cur:
                sections.append(cur)
            cur = {"header": line[3:].strip(), "lines": []}
        elif cur is not None:
            cur["lines"].append(line)
        # lines before first ## go to a implicit intro section
    if cur:
        sections.append(cur)

    for s in sections:
        s["text"] = "\n".join(s["lines"]).strip()

    return frontmatter, body, sections


# ── 2. Slide planning via Claude ────────────────────────────────────────────

PLAN_PROMPT = """\
You are an expert slide designer. Convert this LLM Wiki page into a beginner-friendly
teaching slideshow.

=== WIKI PAGE ===
{wiki_text}
=================

Slide count guidance (use your semantic + keyword-density judgment):
- 5–9 slides is typical; dense sections with ≥3 mechanisms or ≥4 distinct keywords → split
- Slide 1: title slide (use the `question:` frontmatter as the central question)
- Body slides: one clear concept per slide
- Final slide: summary + 3 key takeaways
- Each slide MUST cite its source section header

Output ONLY valid JSON (no markdown fences, no explanation):

[
  {{
    "num": 1,
    "layout": "title",
    "title": "...",
    "subtitle": "...",
    "note": "...",
    "source_section": "frontmatter"
  }},
  {{
    "num": 2,
    "layout": "bullets",
    "title": "...",
    "kicker": "optional short label",
    "bullets": ["...", "...", "..."],
    "source_section": "## Section Header"
  }},
  {{
    "num": 3,
    "layout": "two-col",
    "title": "...",
    "left_title": "...",
    "left": ["...", "..."],
    "right_title": "...",
    "right": ["...", "..."],
    "source_section": "## Section Header"
  }},
  {{
    "num": 4,
    "layout": "code-bullets",
    "title": "...",
    "bullets": ["...", "..."],
    "code": "optional code snippet (short)",
    "source_section": "## Section Header"
  }},
  {{
    "num": 5,
    "layout": "summary",
    "title": "小結",
    "takeaways": ["...", "...", "..."],
    "source_section": "all"
  }}
]

Layouts available: "title" | "bullets" | "two-col" | "code-bullets" | "summary"
"""


def plan_slides(wiki_text: str, model: str, client=None) -> list:
    import subprocess, shutil
    prompt = PLAN_PROMPT.format(wiki_text=wiki_text)

    # Prefer claude CLI (no API key needed); fall back to anthropic SDK
    claude_bin = shutil.which("claude") or os.path.expandvars(
        "/usr/local/lib/node_modules/@anthropic-ai/claude-code/bin/claude"
    )
    if os.path.exists(claude_bin):
        result = subprocess.run(
            [claude_bin, "-p", prompt, "--output-format", "text"],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0:
            raise RuntimeError(f"claude CLI error: {result.stderr[:300]}")
        raw = result.stdout.strip()
    elif client is not None:
        msg = client.messages.create(
            model=model,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = msg.content[0].text.strip()
    else:
        raise RuntimeError("No claude CLI found and no ANTHROPIC_API_KEY set")

    raw = re.sub(r"^```(?:json)?\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)
    return json.loads(raw)


# ── 3. HTML generation ─────────────────────────────────────────────────────

CSS = """
:root{
  --navy:#182046;--green:#34C759;--red:#E74238;--ink:#1c2230;
  --paper:#F5F7FC;--muted:#5b647a;--line:#d7deec;--accent:#2f6df0;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%;font-family:"STHeiti","Heiti TC","PingFang TC",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);background:var(--navy)}
#deck{height:100vh;display:grid;place-items:center}
.slide{display:none;width:min(960px,92vw);min-height:min(620px,86vh);background:var(--paper);
  border-radius:18px;padding:48px 56px;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:auto}
.slide.on{display:block;animation:fade .25s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.kicker{font-size:14px;letter-spacing:.14em;color:var(--accent);font-weight:700;text-transform:uppercase;margin-bottom:4px}
h1{font-size:38px;line-height:1.15;margin:.2em 0 .15em;color:var(--navy)}
h2{font-size:28px;margin:.1em 0 .5em;color:var(--navy)}
h3{font-size:20px;margin:.5em 0 .3em;color:var(--navy)}
p,li{font-size:19px;line-height:1.65}
ul{padding-left:1.3em} li{margin:.3em 0}
.big{font-size:22px}
.tag{display:inline-block;padding:.1em .6em;border-radius:999px;font-size:14px;font-weight:700;color:#fff}
.tag.g{background:var(--green)}.tag.r{background:var(--red)}.tag.n{background:var(--navy)}
code,.mono{font-family:"SF Mono",ui-monospace,Menlo,monospace;background:#eef1fa;padding:.08em .4em;border-radius:6px;font-size:.88em}
pre{background:#1e2340;color:#cdd6f0;border-radius:12px;padding:16px 20px;font-size:16px;overflow-x:auto;line-height:1.5}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:14px}
.card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px}
.note{color:var(--muted);font-size:16px}
.src{font-size:13px;color:var(--muted);border-top:1px dashed var(--line);margin-top:20px;padding-top:10px}
.center{display:grid;place-content:center;text-align:center;min-height:460px}
.lobster{font-size:48px}
.takeaways{list-style:none;padding:0;margin:0}
.takeaways li{padding:.45em .6em .45em 2.2em;position:relative;background:#fff;border:1px solid var(--line);border-radius:10px;margin:.5em 0;font-size:19px}
.takeaways li::before{content:"✓";position:absolute;left:.6em;color:var(--green);font-weight:700}
#hud{position:fixed;bottom:18px;left:0;right:0;display:flex;justify-content:center;gap:16px;align-items:center;color:#cdd6f0;font-size:14px}
#hud button{background:#2a335c;color:#fff;border:0;border-radius:8px;padding:6px 14px;font-size:14px;cursor:pointer}
#hud button:hover{background:#39457a}
"""

JS = """
const slides=[...document.querySelectorAll('.slide')];
let cur=0;
function go(n){
  slides[cur].classList.remove('on');
  cur=Math.max(0,Math.min(slides.length-1,n));
  slides[cur].classList.add('on');
  document.getElementById('pos').textContent=(cur+1)+' / '+slides.length;
}
document.getElementById('prev').onclick=()=>go(cur-1);
document.getElementById('next').onclick=()=>go(cur+1);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' ')go(cur+1);
  if(e.key==='ArrowLeft')go(cur-1);
});
"""


def _esc(s: str) -> str:
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _bullets(items: list) -> str:
    return "<ul>" + "".join(f"<li>{item}</li>" for item in (items or [])) + "</ul>"


def render_slide(s: dict, idx: int) -> str:
    on = " on" if idx == 0 else ""
    src = _esc(s.get("source_section", ""))
    layout = s.get("layout", "bullets")
    parts = []

    if layout == "title":
        parts.append('<div class="center">')
        parts.append('<div class="lobster">🦞</div>')
        parts.append('<div class="kicker">LLM Wiki → 教學簡報</div>')
        parts.append(f'<h1>{_esc(s.get("title",""))}</h1>')
        if s.get("subtitle"):
            parts.append(f'<p class="big">{_esc(s["subtitle"])}</p>')
        if s.get("note"):
            parts.append(f'<p class="note">{_esc(s["note"])}</p>')
        parts.append("</div>")

    elif layout == "two-col":
        parts.append(f'<div class="kicker">{_esc(s.get("kicker","比較"))}</div>')
        parts.append(f'<h2>{_esc(s.get("title",""))}</h2>')
        parts.append('<div class="cols">')
        parts.append('<div class="card">')
        if s.get("left_title"):
            parts.append(f'<h3>{_esc(s["left_title"])}</h3>')
        parts.append(_bullets(s.get("left", [])))
        parts.append("</div>")
        parts.append('<div class="card">')
        if s.get("right_title"):
            parts.append(f'<h3>{_esc(s["right_title"])}</h3>')
        parts.append(_bullets(s.get("right", [])))
        parts.append("</div></div>")
        parts.append(f'<div class="src">← {src}</div>')

    elif layout == "code-bullets":
        parts.append(f'<div class="kicker">{_esc(s.get("kicker","實作"))}</div>')
        parts.append(f'<h2>{_esc(s.get("title",""))}</h2>')
        parts.append(_bullets(s.get("bullets", [])))
        if s.get("code"):
            parts.append(f'<pre>{_esc(s["code"])}</pre>')
        parts.append(f'<div class="src">← {src}</div>')

    elif layout == "summary":
        parts.append(f'<div class="kicker">總結</div>')
        parts.append(f'<h2>{_esc(s.get("title","小結"))}</h2>')
        parts.append('<ul class="takeaways">')
        for t in s.get("takeaways", []):
            parts.append(f"<li>{_esc(t)}</li>")
        parts.append("</ul>")
        parts.append(f'<div class="src">← {src}</div>')

    else:  # bullets (default)
        parts.append(f'<div class="kicker">{_esc(s.get("kicker",""))}</div>')
        parts.append(f'<h2>{_esc(s.get("title",""))}</h2>')
        parts.append(_bullets(s.get("bullets", [])))
        parts.append(f'<div class="src">← {src}</div>')

    inner = "\n".join(parts)
    return f'<section class="slide{on}">\n{inner}\n</section>'


def build_html(frontmatter: dict, slides: list, source_path: str) -> str:
    kws = frontmatter.get("keywords", [])
    kw_str = ", ".join(kws) if isinstance(kws, list) else str(kws)
    title_meta = frontmatter.get("question", Path(source_path).stem.replace("-", " ").title())
    license_text = frontmatter.get("license", frontmatter.get("source", ""))

    slides_html = "\n".join(render_slide(s, i) for i, s in enumerate(slides))

    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{_esc(title_meta)}</title>
<meta name="keywords" content="{_esc(kw_str)}">
<meta name="generator" content="wiki2slides">
<meta name="source-wiki" content="{_esc(source_path)}">
<style>{CSS}</style>
</head>
<body>
<div id="deck">
{slides_html}
</div>
<div id="hud">
  <button id="prev">◀</button>
  <span id="pos">1 / {len(slides)}</span>
  <button id="next">▶</button>
  <span style="margin-left:12px;opacity:.6">←→ or space</span>
</div>
<div style="display:none" id="license">{_esc(license_text)}</div>
<script>{JS}</script>
</body>
</html>
"""


# ── 4. Provenance lint ─────────────────────────────────────────────────────

def lint(slides: list, sections: list) -> list[str]:
    """Light check: each non-title slide's source_section exists in wiki."""
    section_headers = {s["header"].lower() for s in sections}
    warnings = []
    for s in slides:
        src = s.get("source_section", "")
        if s.get("layout") in ("title",):
            continue
        if src in ("all", "frontmatter", ""):
            continue
        clean = src.lstrip("# ").lower()
        if not any(clean in h for h in section_headers):
            warnings.append(f"Slide {s['num']}: source_section '{src}' not found in wiki sections")
    return warnings


# ── 5. CLI ──────────────────────────────────────────────────────────────────

def slug_from(path: Path) -> str:
    return path.stem


def main():
    ap = argparse.ArgumentParser(description="Convert LLM Wiki page to HTML slides")
    ap.add_argument("wiki", help="Path to wiki .md file")
    ap.add_argument("--out", help="Output HTML path (default: genai/<slug>.html)")
    ap.add_argument("--model", default=os.getenv("WIKI2SLIDES_MODEL", "claude-sonnet-4-5"),
                    help="Claude model (default: claude-sonnet-4-5)")
    ap.add_argument("--dry-run", action="store_true", help="Print slide plan JSON only, no HTML")
    args = ap.parse_args()

    wiki_path = Path(args.wiki)
    if not wiki_path.exists():
        sys.exit(f"File not found: {wiki_path}")

    # Determine output path
    if args.out:
        out_path = Path(args.out)
    else:
        repo_root = Path(__file__).parent.parent
        out_path = repo_root / "genai" / f"{slug_from(wiki_path)}.html"

    print(f"📖  Reading  {wiki_path}", flush=True)
    frontmatter, body, sections = parse_wiki(wiki_path)
    print(f"    Found {len(sections)} sections, keywords: {frontmatter.get('keywords', [])}", flush=True)

    client = None
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if api_key:
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=api_key)
        except ImportError:
            pass  # will fall through to claude CLI

    print(f"🤖  Planning slides ({args.model})…", flush=True)
    plan = plan_slides(body, args.model, client)
    print(f"    Got {len(plan)} slides", flush=True)

    if args.dry_run:
        print(json.dumps(plan, ensure_ascii=False, indent=2))
        return

    # Lint
    warns = lint(plan, sections)
    if warns:
        print("⚠️  Provenance warnings:")
        for w in warns:
            print(f"    {w}")

    # Render
    html = build_html(frontmatter, plan, str(wiki_path))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html, encoding="utf-8")
    print(f"✅  Written  {out_path}  ({len(html):,} bytes)", flush=True)


if __name__ == "__main__":
    main()
