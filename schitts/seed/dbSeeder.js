
const customerSeeder = require('./customers')
const bookingSeeder = require('./bookings')
const dishSeeder = require('./dishes')
const orderSeeder = require('./orders')

module.exports = (db) => {
  try {
    console.log('beginning seed process')
    db.Dish.bulkCreate(dishSeeder, { fields: ['id', 'name', 'description', 'reference', 'price'] })
      .then(() => console.log('dishes successfully seeded'))
      .catch(err => { throw new Error(err) })

    db.Customer.bulkCreate(customerSeeder, { fields: ['id', 'first_name', 'last_name', 'email', 'address', 'city', 'phone_number', 'favorite_dish', 'reference'] })
      .then(() => {
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
  db.Order.bulkCreate(orderSeeder, { fields: ['id', 'order_date', 'tone', 'reference', 'CustomerId', 'customers', 'status', 'feedback', 'party_size'] })
    .then(() => console.log('orders successfully seeded'))
    .catch(err => { throw new Error(err) })
}
