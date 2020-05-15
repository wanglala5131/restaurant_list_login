## 餐廳清單網站
使用node.js、express和express-handlebars、body-parser、mongoDB與mongoose所做的網站


## 環境建置與需求
* node.js v10.15.0 -執行環境
* express v4.17.1 -框架
* express-handlebars v4.0.4 -模板引擎
* body-parser v1.19.0 -中介軟體
* mongoDB - 4.2.6 -資料庫管理系統
* mongoose v 5.9.14 - 物件映射工具


## 安裝與使用
#### 下載專案
    git clone https://github.com/wanglala5131/restaurant-list-with-mongodb.git
#### 安裝package
    npm install
#### 新增種子資料
    npm run seed
#### 使用nodemon啟動伺服器
    npm run dev
#### 或正常啟動
    npm start


## 網站功能
* 可以瀏覽喜好餐廳的名字、類型與評分
* 點擊餐廳卡片，可瀏覽更詳細的資訊
* 根據關鍵字可搜尋餐廳名稱、類型
* 可新增新的餐廳資料
* 可編輯餐廳資料
* 可刪除餐廳資料