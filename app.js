const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

//首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
//詳細頁
app.get('/restaurant/detail/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//新增店家資料
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

//編輯店家資料
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})
app.put('/restaurant/:id', (req, res) => {
  let { name, name_en, category, phone, image, location, rating, google_map, description } = req.body
  const id = req.params.id
  if (image.length === 0) {
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
  }
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.phone = phone
      restaurant.image = image
      restaurant.location = location
      restaurant.rating = rating
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}/edit`))
    .catch(err => console.log(err))
})

//刪除店家資料
app.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//搜尋，可搜尋英文名、中文名和類型
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword)
        || restaurant.name_en.toLowerCase().includes(keyword)
        || restaurant.category.toLowerCase().includes(keyword)
      )
    })
    .then(restaurants => res.render('index', { restaurants, keyword: keyword }))
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})