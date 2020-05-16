const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//搜尋，可搜尋英文名、中文名和類型
router.get('/', (req, res) => {
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


module.exports = router