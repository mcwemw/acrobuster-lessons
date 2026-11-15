# AGENTS.md — ACROBUSTER 研究講義站

這份文件是這個專案的「施工規則書」。任何 AI（或人）在新增、修改頁面前，**必讀本檔**，並嚴格遵守以下規則。目標是：讀完這份文件，就能在**不問作者**的情況下，正確地長出一張新的講義卡，而且風格、結構、格式與既有內容完全一致。

---

## 1. 專案目的

一個**靜態研究講義站**，把作者（吳美真 / Emma Wu）自己的研究概念，拆成一張張「概念卡（lesson）」呈現。像課堂的「呆一布講義」，但內容全部是作者原創的研究筆記（RAG 忠實度、工程思維、AI Agent 設計）。

核心價值：**可持續擴充**。新增一張卡只要照本檔規則做兩步，不需要重新設計版面或樣式。

---

## 2. 整體風格（ACROBUSTER 品牌）

- 色票（**只能用這五色**，定義在 `assets/style.css` 的 CSS 變數）：
  - `--navy: #182046`（主色 / 標題 / 頁首）
  - `--green: #34C759`（AC 綠 / 正面、通過、重點標記）
  - `--red: #E74238`（ROBUST 紅 / 警示、反例、失效）
  - `--cream: #F5F7FC`（底色）
  - `--ink: #1c2538`（內文）
- 字體：系統 CJK 字體堆疊（已設在 CSS，勿改成需要外部下載的字體，避免離線壞字）。
- 語言：**中英雙語（EMI 課程要求）**。每個區塊、每張卡的標題與內容都「**中文在上、英文在下**」並陳；英文版用 `<p class="en">…</p>`（區塊標題用 `<span class="en">…</span>`）。新增卡時 EN 版一定要一起寫，別只寫中文。
- 調性：簡潔、重點先行、**每條主張盡量附出處**（呼應作者研究原則：言而有據）。

---

## 3. 檔案結構（固定，勿更動位置）

```
/
├── cards/                ← 🟢 講義卡「單一資料源」：一卡一個 .md（唯一手改處）
│   ├── 01-rag-faithfulness.md
│   └── …
├── build/
│   ├── build.py          ← 生成器：cards/*.md → lessons/*.html + content/lessons.js
│   ├── analyze.py        ← 分析：標籤分布/連結圖/來源覆蓋
│   └── README.md         ← md 格式與建置說明
├── index.html            ← 首頁：自動列出所有卡（勿手改）
├── AGENTS.md             ← 本規則書
├── assets/style.css      ← 全站樣式（改樣式只改這裡）
├── content/
│   ├── lessons.js        ← ⚙️ 生成物,勿手改(由 build.py 產)
│   └── notes.js          ← ⚙️ 生成物,勿手改(由 build_notes.py 產)
├── notes_md/             ← 🟢 每日論文筆記「單一源」:一篇一個 .md(四色文字)
└── lessons/
    └── NN-slug.html      ← ⚙️ 生成物,勿手改(由 build.py 產)
```

---

## 4. 🔧 如何新增一張講義卡（AI 照這兩步做）

> 🟢 **卡片來源改成 Markdown**：只編 `cards/*.md`，HTML 與索引用 `build.py` 生成。
> `lessons/*.html`、`content/lessons.js` 是**生成物，不要手改**。詳見 `build/README.md`。

### 步驟 A：寫 `cards/NN-slug.md`
1. 新增 `cards/NN-slug.md`。`NN` = 兩位數流水號（最大號 +1）；`slug` = 全小寫、`-` 連字、a–z0–9。
2. 檔頭 YAML frontmatter（metadata）：`id / slug / tag / title / title_en / title_short / summary / summary_en / links`。`tag` 從六類擇一：RAG / 提示工程 / AI 工程 / 軟體工程 / 模型原理 / 代理工程。
3. 正文**固定三段**：`## 是什麼 · What it is` → `## 為什麼重要 · Why it matters` → `## 一句話帶走 · Takeaway`。每段中文段落在上，英文對照用 `::: en … :::`；出處用 `::: src … :::`。
4. 可用 `**粗體**`、`*斜體*`、markdown 表格、`[[NN-slug|文字]]` 卡間連結；正面/反面色標直接寫行內 HTML `<span class="tag-pass|tag-warn|tag-fail">`（**不要自創新顏色**）。

### 步驟 B：生成
```
python3 build/build.py cards .
```
→ 自動產出 `lessons/NN-slug.html` 與 `content/lessons.js`（首頁/過濾/搜尋自動吃）。**不要手改 index.html / lessons.js / lessons/*.html**。

### 完成檢查（AI 新增後自我驗證）
- [ ] `cards/NN-slug.md` 有完整 frontmatter（六類 tag 擇一）＋三段＋每段中英對照（`::: en`）。
- [ ] 每個「主張」段落有 `::: src` 出處或標「作者觀點 Author's view」。
- [ ] 跑過 `build.py`，`git status` 只看到你的卡 + 它生成的 HTML/lessons.js。
- [ ] 本機瀏覽器開 `index.html` 看得到新卡、點得進去、過濾/搜尋找得到。

---

## 5. 🔴 內容紅線（違反即不可上線）

- **只放作者原創內容**。不得貼他人文章、投影片、圖卡原文（抄襲零容忍）。引用他人觀點須改寫並註明出處。
- **不放任何機密 / IP**：不放考題（真題）、未公開研究數據、個人私密資料。
- 每張卡若含「事實主張」，須在 `出處` 區塊附來源；純屬作者框架的，標「作者觀點」。
- 外部連結只連公開、可查證的來源。

---

## 6. 命名與 commit 慣例

- 頁面檔：`lessons/NN-slug.html`（見 §4）。
- 圖片（若有）：放 `assets/`，命名 `NN-slug-說明.png`。
- commit 訊息：`add lesson NN: <標題>` 或 `fix: <說明>`。

---

## 7. 每日論文筆記（notes.html，自動）

站上有一個獨立的「每日論文筆記」區（`notes.html`），跟 §4 的原創概念卡**分開**，不混淆。由每天 05:00 的 cron 自動產生。🟢 **筆記也改成 Markdown 單一源**：四色文字現在是 `notes_md/*.md`（可搜尋、可重用、Obsidian 可編），`notes.html` 與 `content/notes.js` 是**生成物，勿手改**。

- 內容源 `notes_md/YYYY-MM-DD_slug.md`：frontmatter（date / tag / title / title_en / source / img / zotero）＋ 四色文字（核心問題 / 🔴背景 / 🟡概念 / 🔵原文引述 / 🟠我的想法）。
- 原康乃爾 PNG 仍放 `notes/YYYY-MM-DD_slug.png`，在 notes.html 收進 `<details>` 附圖。
- 生成：`python3 build/build_notes.py notes_md .` → `notes.html`（含四色文字＋搜尋）＋ `content/notes.js`（索引）。
- 紅線同 §5：只導讀公開論文、標 CC 授權、每條主張可回源 abstract。

AI 新增一篇筆記＝① 產康乃爾圖存 `notes/` ② 寫 `notes_md/YYYY-MM-DD_slug.md`（四色文字）③ 跑 `build/build_notes.py` ④ commit+push。

---

遵守本檔 = 任何人／AI 都能在 5 分鐘內長出一張風格一致、言而有據的新講義卡或論文筆記。
