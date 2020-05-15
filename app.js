const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurants.js')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})
app.get('/restaurant/create', (req, res) => {
  res.render('create')
})
app.post('/restaurant/create', (req, res) => {
  let { name, name_en, category, phone, image, location, rating, google_map, description } = req.body
  if (image.length === 0) {
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
  }
  return Restaurant.create({ name, name_en, category, phone, image, location, rating, google_map, description })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})