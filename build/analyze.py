#!/usr/bin/env python3
"""ACROBUSTER cards 分析(從 md 單一源,免爬 HTML)。

示範「資料結構化後可查詢」:標籤分布、交叉連結關係圖(含孤卡/熱點)、來源覆蓋。
用法: analyze.py [cards_dir]   預設 cards/
"""
import os, re, sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.abspath(__file__))


def parse(path):
    t = open(path, encoding="utf-8").read()
    _, fm, body = t.split("---", 2)
    meta = {}
    for line in fm.strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1); meta[k.strip()] = v.strip().strip('"\'')
    links = set(re.findall(r"\[\[([^\]|]+)", body))   # [[slug]] / [[slug|txt]]
    has_src = ":::" in body and "::: src" in body
    return meta, links, has_src


def main(argv):
    cards = argv[0] if argv else os.path.join(ROOT, "cards")
    files = sorted(f for f in os.listdir(cards) if f.endswith(".md"))
    tags = Counter(); outdeg = {}; indeg = Counter(); src = 0; total = 0
    id_of = {}  # slug -> id
    for fn in files:
        meta, links, has_src = parse(os.path.join(cards, fn))
        total += 1; tags[meta.get("tag", "?")] += 1
        src += 1 if has_src else 0
        slug = meta["slug"]; id_of[slug] = meta.get("id", "?")
        # 連結目標去掉前綴編號取 slug(連結寫法是 NN-slug)
        outs = {re.sub(r"^\d+-", "", t) for t in links}
        outdeg[slug] = outs
        for t in outs:
            indeg[t] += 1

    print(f"# ACROBUSTER cards 分析 — {total} 張\n")
    print("## 標籤分布")
    for tag, n in tags.most_common():
        print(f"  {tag:<8} {n:>2}  " + "█" * n)
    print(f"\n## 來源覆蓋\n  有 ::: src 出處區塊: {src}/{total}")
    print("\n## 交叉連結熱點(被最多卡引用)")
    for slug, n in indeg.most_common(8):
        print(f"  ←{n:>2}  {id_of.get(slug,'??')}-{slug}")
    orphans = [s for s in outdeg if indeg[s] == 0]
    print(f"\n## 孤卡(沒有其他卡連進來,{len(orphans)} 張)")
    for s in sorted(orphans, key=lambda s: id_of.get(s, "")):
        print(f"  {id_of.get(s,'??')}-{s}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
