const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('已存在')
        return res.render('register', { name, email, password, confirmPassword })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router