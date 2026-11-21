---
question: 電腦視覺的核心任務(分類/偵測/分割)差在哪?影像成像與特徵怎麼來?CNN 為何主宰視覺、物件偵測如何運作?
keywords: [computer-vision, object-detection, image-segmentation]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Computer vision [[raw:aic25-cv-wikipedia]](CC BY-SA 4.0)、Object detection [[raw:aic25-detection-wikipedia]](CC BY-SA 4.0)、Image segmentation [[raw:aic25-segmentation-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.25(Computer Vision)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 電腦視覺 Computer Vision（AIMA Ch.25）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:從影像/視訊推斷世界——分類(是什麼)、偵測(在哪+框)、分割(逐像素)、三維重建;CNN 的局部+平移不變歸納偏好使其主宰視覺。(aic25-cv-wikipedia)

## 1. 成像與低層視覺

- **成像**:場景→相機投影(針孔模型、焦距、透視)→ 像素。(aic25-cv-wikipedia)
- **低層特徵**:邊緣(梯度/Canny)、角點(Harris)、尺度不變特徵(SIFT/SURF);傳統視覺手工設計這些。
- 深度學習前:手工特徵 + 分類器;**深度學習後**:CNN 端到端學特徵([[ai-deep-learning]])。

## 2. 核心任務階梯

- **影像分類**:整張圖一個標籤(貓/狗)。
- **物件偵測**:定位 + 分類多個物件,輸出**邊界框 + 類別**。(aic25-detection-wikipedia)
  - 兩階段(R-CNN 系:提議區域→分類)vs 單階段(YOLO/SSD:直接回歸框,快)。
  - **NMS(非極大抑制)**去重疊框;IoU 衡量框準度。
- **語意分割**:每像素一類別;**實例分割**:區分同類不同個體(Mask R-CNN)。(aic25-segmentation-wikipedia)

## 3. CNN 主宰視覺

- 卷積(局部連接 + 權重共享)+ 池化 → **平移不變、參數少**,天然契合影像網格([[ai-deep-learning]])。
- 里程碑:AlexNet(2012 ImageNet 突破)→ VGG/GoogLeNet → ResNet(殘差,極深)→ Vision Transformer(ViT,把注意力帶入視覺)。
- 遷移學習:ImageNet 預訓練特徵遷移到小資料任務。

## 深化:卷積運算 + 偵測評估 + 分割方法

### 卷積運算 worked
卷積核(如 3×3 Sobel)在影像上滑動,每位置做元素乘加 → 特徵圖。邊緣核放大梯度。CNN 的核**由資料學**(非手設)。參數量 = 核大小×通道數(與影像大小無關→權重共享省參數)。步幅/填充控制輸出尺寸;池化下採樣增感受野。

### 物件偵測評估
**IoU**=交集/聯集(預測框 vs 真值);IoU>閾值算正確。**mAP**(mean Average Precision)跨類別跨 IoU 平均,是偵測標準指標。NMS:同物多框時保最高分、抑制高 IoU 重疊框。

### 分割方法
語意分割用**全卷積網路(FCN)**/U-Net(編碼-解碼 + skip 連結保細節);傳統法有圖割(graph cut,接 [[network-flow]] 最小割!)、分水嶺、區域生長。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 偵測=分類 | 偵測要**定位(框)+分類**多物件 |
| 語意=實例分割 | 語意只分類別;實例還區分同類個體 |
| CNN 參數隨影像變大 | 權重共享→參數與影像尺寸**無關** |
| 分割與圖論無關 | graph cut 分割=[[network-flow]] 最小割 |

## 我的想法 / 啟發

- **視覺任務階梯(分類→偵測→分割→3D)= 輸出結構越來越細**,對應不同架構;資格考要分清任務定義與評估指標(IoU/mAP)。
- **CNN 的歸納偏好**(局部+平移不變,[[ai-deep-learning]])是「架構=先驗」的最佳範例;ViT 則用注意力([[ai-nlp-deep]])挑戰之——視覺與語言架構在融合。
- **圖割分割=最小割**([[network-flow]])是跨章驚喜:演算法軌的對偶思想直接用在視覺——理論的複利。接我做過的醫學影像 pipeline。

## Next action / 下一步

1. 補 U-Net/Mask R-CNN 結構 + 3D 視覺(立體/深度估計)。
2. 接 [[ai-robotics]](Ch.26)——視覺作為機器人的感知輸入。

## 交叉引用 / 出處
- raw:`wiki/raw/aic25-cv-wikipedia.md`、`aic25-detection-wikipedia.md`、`aic25-segmentation-wikipedia.md`
- [[ai-deep-learning]] — CNN 歸納偏好;[[ai-nlp-deep]] — ViT 注意力;[[network-flow]] — graph cut 分割;[[ai-robotics]] — 感知
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.25)
