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

  for (let x = 0; x < users.length; x++) {
    //還必須加上檢查是否加過

    const filterRestaurant = restaurantList.filter(restaurant => restaurant.owner === users[x].name)
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(users[x].password, salt))
      .then(hash => User.create({
        name: users[x].name,
        email: users[x].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        for (let i = 0; i < filterRestaurant.length; i++) {
          Restaurant.create({
            name: filterRestaurant[i].name,
            name_en: filterRestaurant[i].name_en,
            category: filterRestaurant[i].category,
            image: filterRestaurant[i].image,
            location: filterRestaurant[i].location,
            phone: filterRestaurant[i].phone,
            google_map: filterRestaurant[i].google_map,
            rating: filterRestaurant[i].rating,
            description: filterRestaurant[i].description,
            userId
          })
        }
      })
  }
  console.log('create seed!!')
  //想不出怎麼使用promise.all QQ
})