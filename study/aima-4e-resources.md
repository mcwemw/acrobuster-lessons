# AIMA 4e 學習資源整合（AI 軌）

> 把 6 個公開 AIMA 第四版資料源逐章對齊到本庫 24 頁 AI 軌複習頁。
> **互動中樞**（可點矩陣，GitHub Pages 開）：<https://mcwemw.github.io/acrobuster-lessons/genai/aima-4e-hub.html>
> 一句話：這些頁建**概念與 gotchas**，外部資源補**視覺化直覺、練習題、可跑程式** — 四者合起來才是完整複習迴圈。🔴 全公開 CC/MIT，真題零碰。

## 1. 六個資料源

| 資源 | 是什麼 | 授權 | 怎麼用（資格考） |
|---|---|---|---|
| [jsurrea / aima-visualizations](https://jsurrea.github.io/aima-visualizations/) | 4e 完整 29 章互動微前端；逐步跑演算法、改參數即時看、KaTeX 數學 | MIT | 讀完概念後「看演算法動起來」建直覺（A*／minimax／AC-3／MCMC／反傳） |
| [aimacode / aima-exercises](https://aimacode.github.io/aima-exercises/) | 官方線上習題（4e 起只在線上）；逐章 md+LaTeX，部分附解 | MIT | 每章刷題 → 對照 gotchas 自評；練「會做」勝過「看懂」 |
| [aimacode / aima-python](https://github.com/aimacode/aima-python) | Norvig 官方 Python 實作，21 模組 + notebook | MIT | 課本偽碼對到可跑程式；改輸入驗證複雜度直覺 |
| [pypi / aima](https://pypi.org/project/aima/) | aima-python 的可安裝鏡像（2024.9.28，Py3.9/3.10） | MIT | `pip install aima` 免 clone 跑小實驗 |
| [aimacode / aima-javascript](https://aimacode.github.io/aima-javascript/) | 經典 JS 視覺化（精選概念，非全章） | MIT | jsurrea 的前身/補充 |
| [aima.memify.wiki](https://aima.memify.wiki/wiki/) | AIMA 概念 wiki（baojie/aima） | 見 repo | 陌生術語二手速查；**非引用來源** |

## 2. 🔴 版次對齊是整合的護城河（別盲接章號）

三個資源用**三套章號**，盲接會連錯頁 —

- **本庫／aima-python** = 官方 **4e** 章序。
- **jsurrea** = 自己的 **29 章**排序：**CSP=ch05、對抗=ch06（跟官方 4e 相反）**，多一章「知識中的學習」(ch20)，哲學/倫理=ch28、AI 未來=ch29。部署網址 `/chapter-NN/` 用它自己的號。
- **aima-exercises** = **3e 27 章**命名（後半章號 ≠ 4e；例 3e-Ch12=知識表示、3e-Ch10=規劃；且有手誤拼字 `13-Quantifying-Uncertainity`、`17-Making-Complex-Decision` 單數）。無 ch27 資料夾。

→ 下表與互動中樞全部**按主題**對齊、連結於 2026-11-21 逐一驗證（jsurrea `/chapter-NN/`、exercises markdown 資料夾、aima-python `aima/*.py` 皆回 200）。

## 3. 逐章對應（主題 → 四路資源）

| 4e 章 | 本庫頁 | 🎬 jsurrea 視覺化 | 📝 aima-exercises（3e） | 🐍 aima-python |
|---|---|---|---|---|
| 1 | [ai-introduction.md](ai-introduction.md) | [ch01](https://jsurrea.github.io/aima-visualizations/chapter-01/) | [1-Introduction](https://github.com/aimacode/aima-exercises/tree/master/markdown/1-Introduction) | — |
| 2 | [ai-intelligent-agents.md](ai-intelligent-agents.md) | [ch02](https://jsurrea.github.io/aima-visualizations/chapter-02/) | [2-Intelligent-Agent](https://github.com/aimacode/aima-exercises/tree/master/markdown/2-Intelligent-Agent) | [agents.py](https://github.com/aimacode/aima-python/blob/master/aima/agents.py) |
| 3 | [ai-search.md](ai-search.md) | [ch03](https://jsurrea.github.io/aima-visualizations/chapter-03/) | [3-Solving-Problems-By-Searching](https://github.com/aimacode/aima-exercises/tree/master/markdown/3-Solving-Problems-By-Searching) | [search.py](https://github.com/aimacode/aima-python/blob/master/aima/search.py) |
| 4 | [ai-search-complex.md](ai-search-complex.md) | [ch04](https://jsurrea.github.io/aima-visualizations/chapter-04/) | [4-Beyond-Classical-Search](https://github.com/aimacode/aima-exercises/tree/master/markdown/4-Beyond-Classical-Search) | [search.py](https://github.com/aimacode/aima-python/blob/master/aima/search.py) |
| 5 | [ai-adversarial-search.md](ai-adversarial-search.md) | [ch06](https://jsurrea.github.io/aima-visualizations/chapter-06/) | [5-Adversarial-Search](https://github.com/aimacode/aima-exercises/tree/master/markdown/5-Adversarial-Search) | [games.py](https://github.com/aimacode/aima-python/blob/master/aima/games.py) |
| 6 | [ai-csp.md](ai-csp.md) | [ch05](https://jsurrea.github.io/aima-visualizations/chapter-05/) | [6-Constraint-Satisfaction-Problems](https://github.com/aimacode/aima-exercises/tree/master/markdown/6-Constraint-Satisfaction-Problems) | [csp.py](https://github.com/aimacode/aima-python/blob/master/aima/csp.py) |
| 7–9 | [ai-logic.md](ai-logic.md) | [ch07](https://jsurrea.github.io/aima-visualizations/chapter-07/) · [ch08](https://jsurrea.github.io/aima-visualizations/chapter-08/) · [ch09](https://jsurrea.github.io/aima-visualizations/chapter-09/) | [7-Logical-Agents](https://github.com/aimacode/aima-exercises/tree/master/markdown/7-Logical-Agents) · [8-FOL](https://github.com/aimacode/aima-exercises/tree/master/markdown/8-First-Order-Logic) · [9-Inference-FOL](https://github.com/aimacode/aima-exercises/tree/master/markdown/9-Inference-In-First-Order-Logic) | [logic.py](https://github.com/aimacode/aima-python/blob/master/aima/logic.py) |
| 10 | [ai-knowledge-representation.md](ai-knowledge-representation.md) | [ch10](https://jsurrea.github.io/aima-visualizations/chapter-10/) | [12-Knowledge-Representation](https://github.com/aimacode/aima-exercises/tree/master/markdown/12-Knowledge-Representation) | [knowledge.py](https://github.com/aimacode/aima-python/blob/master/aima/knowledge.py) |
| 11 | [ai-planning.md](ai-planning.md) | [ch11](https://jsurrea.github.io/aima-visualizations/chapter-11/) | [10-Classical-Planning](https://github.com/aimacode/aima-exercises/tree/master/markdown/10-Classical-Planning) · [11-Planning-And-Acting](https://github.com/aimacode/aima-exercises/tree/master/markdown/11-Planning-And-Acting-In-The-Real-World) | [planning.py](https://github.com/aimacode/aima-python/blob/master/aima/planning.py) |
| 12–13 | [ai-probabilistic-reasoning.md](ai-probabilistic-reasoning.md) | [ch12](https://jsurrea.github.io/aima-visualizations/chapter-12/) · [ch13](https://jsurrea.github.io/aima-visualizations/chapter-13/) | [13-Quantifying-Uncertainity](https://github.com/aimacode/aima-exercises/tree/master/markdown/13-Quantifying-Uncertainity) · [14-Probabilistic-Reasoning](https://github.com/aimacode/aima-exercises/tree/master/markdown/14-Probabilistic-Reasoning) | [probability.py](https://github.com/aimacode/aima-python/blob/master/aima/probability.py) |
| 14 | [ai-temporal-models.md](ai-temporal-models.md) | [ch14](https://jsurrea.github.io/aima-visualizations/chapter-14/) | [15-Probabilistic-Reasoning-Over-Time](https://github.com/aimacode/aima-exercises/tree/master/markdown/15-Probabilistic-Reasoning-Over-Time) | [probability.py](https://github.com/aimacode/aima-python/blob/master/aima/probability.py) |
| 15 | [ai-probabilistic-programming.md](ai-probabilistic-programming.md) | [ch18](https://jsurrea.github.io/aima-visualizations/chapter-18/) | — | [probability.py](https://github.com/aimacode/aima-python/blob/master/aima/probability.py) |
| 16–17 | [ai-decision-making.md](ai-decision-making.md) | [ch15](https://jsurrea.github.io/aima-visualizations/chapter-15/) · [ch16](https://jsurrea.github.io/aima-visualizations/chapter-16/) | [16-Making-Simple-Decisions](https://github.com/aimacode/aima-exercises/tree/master/markdown/16-Making-Simple-Decisions) · [17-Making-Complex-Decision](https://github.com/aimacode/aima-exercises/tree/master/markdown/17-Making-Complex-Decision) | [mdp.py](https://github.com/aimacode/aima-python/blob/master/aima/mdp.py) |
| 18 | [ai-multiagent.md](ai-multiagent.md) | [ch17](https://jsurrea.github.io/aima-visualizations/chapter-17/) | — | [game_theory.py](https://github.com/aimacode/aima-python/blob/master/aima/game_theory.py) |
| 19 | [ai-machine-learning.md](ai-machine-learning.md) | [ch19](https://jsurrea.github.io/aima-visualizations/chapter-19/) · [ch20](https://jsurrea.github.io/aima-visualizations/chapter-20/) | [18-Learning-From-Examples](https://github.com/aimacode/aima-exercises/tree/master/markdown/18-Learning-From-Examples) · [19-Knowledge-In-Learning](https://github.com/aimacode/aima-exercises/tree/master/markdown/19-Knowledge-In-Learning) | [learning.py](https://github.com/aimacode/aima-python/blob/master/aima/learning.py) |
| 20 | [ai-learning-probabilistic.md](ai-learning-probabilistic.md) | [ch21](https://jsurrea.github.io/aima-visualizations/chapter-21/) | [20-Learning-Probabilistic-Models](https://github.com/aimacode/aima-exercises/tree/master/markdown/20-Learning-Probabilistic-Models) | [probabilistic_learning.py](https://github.com/aimacode/aima-python/blob/master/aima/probabilistic_learning.py) |
| 21 | [ai-deep-learning.md](ai-deep-learning.md) | [ch22](https://jsurrea.github.io/aima-visualizations/chapter-22/) | — | [deep_learning.py](https://github.com/aimacode/aima-python/blob/master/aima/deep_learning.py) |
| 22 | [ai-reinforcement-learning.md](ai-reinforcement-learning.md) | [ch23](https://jsurrea.github.io/aima-visualizations/chapter-23/) | [21-Reinforcement-Learning](https://github.com/aimacode/aima-exercises/tree/master/markdown/21-Reinforcement-Learning) | [reinforcement_learning.py](https://github.com/aimacode/aima-python/blob/master/aima/reinforcement_learning.py) |
| 23 | [ai-nlp.md](ai-nlp.md) | [ch24](https://jsurrea.github.io/aima-visualizations/chapter-24/) | [22-Natural-Language-Processing](https://github.com/aimacode/aima-exercises/tree/master/markdown/22-Natural-Language-Processing) | [nlp.py](https://github.com/aimacode/aima-python/blob/master/aima/nlp.py) · [text.py](https://github.com/aimacode/aima-python/blob/master/aima/text.py) |
| 24 | [ai-nlp-deep.md](ai-nlp-deep.md) | [ch25](https://jsurrea.github.io/aima-visualizations/chapter-25/) | [23-Natural-Language-For-Communication](https://github.com/aimacode/aima-exercises/tree/master/markdown/23-Natural-Language-For-Communication) | [nlp.py](https://github.com/aimacode/aima-python/blob/master/aima/nlp.py) |
| 25 | [ai-computer-vision.md](ai-computer-vision.md) | [ch27](https://jsurrea.github.io/aima-visualizations/chapter-27/) | [24-Perception](https://github.com/aimacode/aima-exercises/tree/master/markdown/24-Perception) | [perception.py](https://github.com/aimacode/aima-python/blob/master/aima/perception.py) |
| 26 | [ai-robotics.md](ai-robotics.md) | [ch26](https://jsurrea.github.io/aima-visualizations/chapter-26/) | [25-Robotics](https://github.com/aimacode/aima-exercises/tree/master/markdown/25-Robotics) | — |
| 27 | [ai-philosophy-ethics-safety.md](ai-philosophy-ethics-safety.md) | [ch28](https://jsurrea.github.io/aima-visualizations/chapter-28/) | [26-Philosophical-Foundations](https://github.com/aimacode/aima-exercises/tree/master/markdown/26-Philosophical-Foundations) | — |
| 28 | [ai-future.md](ai-future.md) | [ch29](https://jsurrea.github.io/aima-visualizations/chapter-29/) | — | — |

## 4. 複習迴圈

1. **讀** 本庫概念頁（結論→條件→推導 + gotchas）。
2. **看** jsurrea 對應 ch 的互動視覺化 → 抽象變動態直覺。
3. **刷** aima-exercises 該章題 → 自評對照 gotchas。
4. **跑** aima-python 模組 → 偽碼變可跑、驗複雜度。
5. 卡住的點回寫 gotchas（複利）。

---
_連結於 2026-11-21 逐一驗證；只掛公開 CC/MIT 教材。_
