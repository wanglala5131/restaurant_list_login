## 餐廳清單網站
使用node.js、express、mongoDB、與其他相關工具所做的網站


## 環境建置與需求

# 執行環境、框架與資料庫
* node.js v10.15.0 -執行環境
* express v4.17.1 -框架
* express-handlebars v4.0.4 -模板引擎
* mongoDB - 4.2.6 -資料庫管理系統
* mongoose v 5.9.14 - 物件映射工具

# 中介軟體
* express-session v1.17.1
* body-parser v1.19.0
* method-override v3.0.0
* passport v0.4.1
* passport-facebook v3.0.0
* passport-local v1.0.0
* connect-flash v0.1.1
* dotenv v8.2.0



## 安裝與使用
#### 下載專案
    git clone https://github.com/wanglala5131/restaurant_list_login.git
#### 安裝package
    npm install
#### 新增種子資料
    npm run seed
#### 使用nodemon啟動伺服器
    npm run dev
#### 或正常啟動
    npm start


## 網站功能
# 使用者登入
* 可利用email、password註冊帳號(name非必填)
* 可利用facebook註冊帳號與登入

# 使用者登入後的功能
* 可以瀏覽喜好餐廳的名字、類型與評分
* 點擊餐廳卡片，可瀏覽更詳細的資訊
* 根據關鍵字可搜尋餐廳名稱、類型
* 可新增新的餐廳資料
* 可編輯餐廳資料
* 可刪除餐廳資料
* 根據餐廳名稱、類型與評分可排列順序