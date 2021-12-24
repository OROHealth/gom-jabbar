
const customerSeeder = require('./customers')
const bookingSeeder = require('./bookings')
const dishSeeder = require('./dishes')
const orderSeeder = require('./orders')

module.exports = (db) => {
  db.Customer.bulkCreate(customerSeeder, { fields: ['id', 'first_name', 'last_name', 'email', 'address', 'city', 'phone_number', 'favorite_dish', 'reference'] })
  db.Booking.bulkCreate(bookingSeeder, { fields: ['id', 'party_size', 'reference', 'reservation_date', 'CustomerId'] })
  db.Dish.bulkCreate(dishSeeder, { fields: ['id', 'name', 'description', 'reference', 'price'] })
  db.Order.bulkCreate(orderSeeder, { fields: ['id', 'order_date', 'reference', 'CustomerId'] })
}
