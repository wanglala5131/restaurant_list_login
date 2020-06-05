const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})




module.exports = router