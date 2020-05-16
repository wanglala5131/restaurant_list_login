const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//詳細頁
router.get('/detail/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//新增店家資料
router.get('/create', (req, res) => {
  res.render('create')
})
router.post('/', (req, res) => {
  let { name, name_en, category, phone, image, location, rating, google_map, description } = req.body
  if (image.length === 0) {
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
  }
  return Restaurant.create({ name, name_en, category, phone, image, location, rating, google_map, description })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//編輯店家資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router