const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})




module.exports = router