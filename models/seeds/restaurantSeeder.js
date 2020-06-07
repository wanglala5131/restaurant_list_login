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
  function seeder(users, restaurantList) {
    users.map(user => {
      const { name, email, password } = user
      User.findOne({ email })
        .then(user => {
          //檢查是否存在
          if (user) { return console.log(`${email}已經存在`) }
          const filterRestaurant = restaurantList.filter(restaurant => restaurant.owner === email)
          //不存在就繼續
          return bcrypt
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
                Restaurant.create({
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
                })
              })
            })
        })
        .catch(err => console.log(err))
    })
  }
  //下面的程式雖然跑得出seed
  //但做不出promise.all和process.exit()
  return Promise.all(seeder(users, restaurantList))
    .then(() => {
      console.log('create seed!!')
      process.exit()
    })
    .catch(err => console.log(err))

})