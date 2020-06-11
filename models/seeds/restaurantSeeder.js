const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurants')
const User = require('../user')
const restaurantList = require('./restaurant.json').results

const users = [
  {
    "name": "user1",
    "email": "user1@example.com",
    "password": "12345678"
  },
  {
    "name": "user2",
    "email": "user2@example.com",
    "password": "12345678"
  }
]



db.once('open', () => {
  //seed存成function
  let seeder = new Promise((resolve, reject) => {
    users.map(user => {
      const { name, email, password } = user
      User.findOne({ email })
        .then(user => {
          //檢查是否存在
          if (user) { return console.log(`${email}已經存在`) }
          const filterRestaurant = restaurantList.filter(restaurant => restaurant.owner === email)
          //不存在就繼續
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hashPassword => User.create({
              name,
              email,
              password: hashPassword
            }))
            .then(user => {
              const userId = user._id
              filterRestaurant.map(restaurant => {
                const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurant
                resolve(Restaurant.create({
                  name,
                  name_en,
                  category,
                  image,
                  location,
                  phone,
                  google_map,
                  rating,
                  description,
                  userId
                }))
              })
            })
            .catch(err => reject(err))
        })
        .catch(err => console.log(err))
    })
  })


  //如果沒加setTimeout，最後一個restaurant跑不出來...QQ
  seeder
    .then(() => {
      console.log('create seed!!')
      setTimeout(() => {
        process.exit()
      }, 0)
    })
    .catch(err => console.log(err))

})