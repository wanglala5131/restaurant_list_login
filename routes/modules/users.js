const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const regex = /[0-9][a-z]/i    //需至少含1個數字和1個不限大小寫的字母
  const errors = []
  if (!regex.test(password)) {
    errors.push({ message: '密碼請至少包含一個字母(不限大小)和一個數字' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次輸入的密碼不一致' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此電子郵件已註冊' })
        return res.render('register', { name, email, password, confirmPassword, errors })
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
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功！')
  res.redirect('/users/login')
})

module.exports = router