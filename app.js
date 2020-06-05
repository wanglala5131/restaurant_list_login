const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const usePassprt = require('./config/passport')
require('./config/mongoose')
const routes = require('./routes')
const app = express()
const port = 3000



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassprt(app)


app.use(routes)
app.use(session({
  secret: 'youCantCatchMe',
  resave: false,
  saveUninitialized: true,
}))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})