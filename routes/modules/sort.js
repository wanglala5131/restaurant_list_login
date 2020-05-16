const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//首頁
router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const typeObj = { name: '店名', category: '類型', rating: '評分' }
  const methodObj = { asc: '正序', desc: '反序', descending: '由高至低', ascending: '由低至高' }
  const currentSelected = `${typeObj[type]}：${methodObj[method]}`
  Restaurant.find()
    .lean()
    .sort({ [type]: [method] })
    .then(restaurants => res.render('index', { restaurants, currentSelected }))
    .catch(err => console.log(err))
})

module.exports = router