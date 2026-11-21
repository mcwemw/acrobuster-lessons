---
question: 機器人如何感知-規劃-行動?運動規劃怎麼在構形空間避障找路?SLAM 如何同時定位與建圖?
keywords: [robotics, motion-planning, slam]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Robotics [[raw:aic26-robotics-wikipedia]](CC BY-SA 4.0)、Motion planning [[raw:aic26-motionplan-wikipedia]](CC BY-SA 4.0)、SLAM [[raw:aic26-slam-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.26(Robotics)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 機器人 Robotics（AIMA Ch.26）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:機器人是**具身**的理性代理——在真實、連續、不確定、部分可觀測的世界感知→規劃→行動;難在感測雜訊、連續高維、即時控制。(aic26-robotics-wikipedia)

## 1. 感知-規劃-行動迴圈

- **感知**:感測器(相機 [[ai-computer-vision]]、光達、IMU)→ 狀態估計(濾波,接 [[ai-temporal-models]] 卡爾曼/粒子)。
- **規劃**:運動規劃 + 任務規劃([[ai-planning]])。
- **行動**:控制器驅動致動器;回授控制(PID)。
- 環境是 [[ai-intelligent-agents]] 最難象限(連續+隨機+部分可觀測+動態)。

## 2. 運動規劃(motion planning)

- **構形空間(C-space)**:把機器人縮成一點、障礙膨脹到 C-space;在其中找無碰撞路徑。(aic26-motionplan-wikipedia)
- 方法:
  - **取樣法**:**PRM**(機率路圖,建無碰撞圖再查詢)、**RRT**(快速探索隨機樹,單查詢)——高維避維度詛咒。
  - **組合法**:visibility graph、cell decomposition(低維精確)。
  - **位勢場**:目標吸引 + 障礙排斥(易卡區域最小,接 [[ai-search-complex]] 爬山)。

## 3. SLAM(同時定位與建圖)

- 機器人在**未知環境**同時估計自身位置 + 建地圖——雞生蛋問題(定位需地圖、建圖需位置)。(aic26-slam-wikipedia)
- 機率框架:狀態=位姿 + 地標,用 EKF-SLAM 或 **粒子濾波(FastSLAM)**/圖優化([[ai-temporal-models]]);回環偵測(loop closure)校正累積漂移。

## 深化:RRT + 卡爾曼定位 + 控制

### RRT 概念
從起點長一棵樹:隨機取樣 C-space 一點,往最近樹節點方向延伸一小步(若無碰撞則加入),反覆直到接近目標。**機率完備**(有解時機率 1 找到),高維可行,但路徑非最優(RRT* 漸近最優)。取樣法用隨機性([[randomized-algorithms]])逃高維維度詛咒。

### 機器人定位(接卡爾曼/粒子)
已知地圖求位姿:預測(運動模型推位姿 + 增不確定)→ 更新(感測比對地圖修正)。線性高斯用 EKF;多峰/綁架問題用**蒙地卡羅定位(粒子濾波)**(見 [[ai-temporal-models]])。

### 控制
開環 vs 閉環;**PID**(比例-積分-微分)回授控制;最優控制(LQR)。規劃給路徑,控制負責貼合執行(處理擾動)。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 運動規劃在工作空間 | 在**構形空間**(C-space,障礙膨脹) |
| RRT 給最優路徑 | 機率完備但**非最優**;RRT* 才漸近最優 |
| SLAM 先定位再建圖 | **同時**估兩者(耦合);回環校正漂移 |
| 位勢場一定到目標 | 易卡**區域最小**(需隨機擾動/導航函數) |

## 我的想法 / 啟發

- **機器人=具身理性代理**([[ai-intelligent-agents]]):把 AI 軌所有工具(搜尋/機率/規劃/學習/控制)落到真實連續世界——是 AI 的「期末綜合題」。
- **運動規劃取樣法 + SLAM 粒子濾波 = 隨機化**([[randomized-algorithms]])在高維的勝利;維度詛咒逼人放棄精確、擁抱取樣。接我關注的 Physical AI/ROCm 線。
- **感知(卡爾曼/粒子,[[ai-temporal-models]])+ 規劃([[ai-planning]])+ 控制**的分層,正是 agent 架構階梯在機器人上的體現。

## Next action / 下一步

1. 補 RRT*/PRM* 漸近最優 + FastSLAM/圖 SLAM 完整框架。
2. 補 LQR/MPC 最優控制 + 模仿學習/RL 控制([[ai-reinforcement-learning]])。

## 交叉引用 / 出處
- raw:`wiki/raw/aic26-robotics-wikipedia.md`、`aic26-motionplan-wikipedia.md`、`aic26-slam-wikipedia.md`
- [[ai-intelligent-agents]] — 具身代理;[[ai-temporal-models]] — 卡爾曼/粒子定位;[[ai-planning]] — 任務規劃;[[randomized-algorithms]] — 取樣法
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.26)
