
const customerSeeder = require('./customers')
const bookingSeeder = require('./bookings')
const dishSeeder = require('./dishes')
const orderSeeder = require('./orders')
const serverSeeder = require('./servers')

module.exports = (db) => {
  try {
    console.log('beginning seed process')
    const seedServer = (db) => {
      db.Server.bulkCreate(serverSeeder, { fields: ['id', 'first_name', 'last_name', 'email', 'password', 'token', 'active'] })
        .then(() => console.log('servers successfully seeded'))
        .catch(err => { throw new Error(err) })
    }
    seedServer(db)

    db.Dish.bulkCreate(dishSeeder, { fields: ['id', 'name', 'description', 'reference', 'price'] })
      .then()
      .catch(err => { throw new Error(err) })

    db.Customer.bulkCreate(customerSeeder, { fields: ['id', 'first_name', 'last_name', 'email', 'address', 'city', 'phone_number', 'favorite_dish', 'reference'] })
      .then(() => {
        console.log('dishes successfully seeded')
        seedBooking(db)
        seedOrder(db)
      })
      .catch(err => { throw new Error(err) })
  } catch (err) {
    console.log(err)
  }
}

const seedBooking = (db) => {
  db.Booking.bulkCreate(bookingSeeder, { fields: ['id', 'party_size', 'reference', 'reservation_date', 'CustomerId'] })
    .then(() => console.log('bookings successfully seeded'))
    .catch(err => { throw new Error(err) })
}

const seedOrder = (db) => {
  db.Order.bulkCreate(orderSeeder, { fields: ['id', 'order_date', 'tone', 'reference', 'CustomerId', 'customers', 'status', 'feedback', 'party_size', 'server'] })
    .then(() => console.log('orders successfully seeded'))
    .catch(err => { throw new Error(err) })
}
