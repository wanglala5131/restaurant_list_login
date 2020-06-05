const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const usePassprt = require('./config/passport')
require('./config/mongoose')
const routes = require('./routes')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({             //位置很重要
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassprt(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})