const moment = require('moment');
const { MongoClient, ObjectId } = require('mongodb');
const Customer = require('../models/customer');
const MenuItem = require('../models/menuItem');
const Order = require('../models/order');
const nameGenerator = require('../nameGenerator');
const uri = 'mongodb://localhost:27017';
const randomGenerator = require('./utils');
const { CUSTOMER_TYPES, DRINKS, FOOD, MENU_ITEMS, ORDER_TONES } = require('../constants');
const PreviousOrder = require('../models/previousOrder');

// TODO close connection clients after all DB related functions
// TODO fix try catch blocks for all functions

async function getDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = await client.db('schitts');
    console.log(`Connected to database ${db.databaseName}`);
    return [db, client];
  }
  catch (error) {
    console.log(`An error has occured ${error}`);
  }
}

// TODO fix for queries 
async function findSpecificInfo(tableName) {
  const res = await getDatabase();
  const db = res[0];
  const client = res[1];
  const table = await db.collection(tableName);
  const searchCursor = await table.find();
  const result = await searchCursor.toArray();
  console.table(result)
  client.close();
  return result;
}

async function findDBTable(tableName) {
  const res = await getDatabase();
  const db = res[0];
  const client = res[1];
  const table = await db.collection(tableName);
  const searchCursor = await table.find();
  const result = await searchCursor.toArray();
  console.table(result)
  client.close();
  return result;
}
async function insertObservations(tableName, observations) {
  const res = await getDatabase();
  const db = res[0];
  const client = res[1];
  const table = db.collection(tableName);
  const insertCursor = await table.insertMany(observations);
  console.log(insertCursor.insertedCount, `observations were inserted into ${tableName} table`);
  findDBTable(tableName);
  client.close();
}

function insertCustomers(customers) {
  insertObservations('customers', customers);
}

async function createTenThousandCustomers() {
  let customers = [];
  for (let i = 0; i < 10000; i++) {
    // TODO Change to male or female
    const name = await nameGenerator.generateName('male');
    const customerType = CUSTOMER_TYPES[randomGenerator.generateRandomNumber(0, 2)];
    const preferredDrinkId = ObjectId(DRINKS[randomGenerator.generateRandomNumber(0, 2)]);
    const preferredFoodId = ObjectId(FOOD[randomGenerator.generateRandomNumber(0, 2)]);
    const customer = new Customer(name, customerType, preferredDrinkId, preferredFoodId);
    customers.push(customer);
  }
  insertCustomers(customers);
}

async function insertPreviousOrders() {
  const customers = await findDBTable('customers');
  const allPreviousOrders = [];
  // TODO fix for loop variables
  // for each year
  for (let i = 0; i < 2; i++) {
    // For each customer
    for (let j = 0; j < 9999; j++) {
      const ordersAmountPerYear = randomGenerator.generateRandomNumber(2, 14);
      for (let y = 0; y < ordersAmountPerYear; y++) {
        const customersOrders = {};
        const customerId = customers[j]._id;
        const randomOrdersAmount = randomGenerator.generateRandomNumber(1, 3);
        const orderItemDict = {};

        for (let k = 0; k < randomOrdersAmount; k++) {
          const orderItem = MENU_ITEMS[randomGenerator.generateRandomNumber(0, 5)];
          orderItemDict[orderItem] = {'count': randomGenerator.generateRandomNumber(1, 3),
            'feedback': randomGenerator.generateRandomNumber(0, 10)}
        }
        customersOrders[customerId] = orderItemDict;
        // Find amount of friends
        const randomFriendsAmount = randomGenerator.generateRandomNumber(0, 3);
        for (let x = 0; x < randomFriendsAmount + 1; x++) {
          const randomCustomer = randomGenerator.generateRandomNumber(0, 9999);
          const customerId = customers[randomCustomer]._id;
          const randomOrdersAmount = randomGenerator.generateRandomNumber(1, 3);
          const orderItemDict = {};

          for (let k = 0; k < randomOrdersAmount; k++) {
            let orderItem = MENU_ITEMS[randomGenerator.generateRandomNumber(0, 5)];
            orderItemDict[orderItem] = {'count': randomGenerator.generateRandomNumber(1, 3),
              'feedback': randomGenerator.generateRandomNumber(0, 10)}
          }
          customersOrders[customerId] = orderItemDict;
        }
        // console.log(customersOrders)
        const orderTone = ORDER_TONES[randomGenerator.generateRandomNumber(0, 6)];
        // console.log(order_tone)
        if (i === 0) {
          const pastTime = randomGenerator.generateRandomTime(0, 3154000000);
          const previousOrder = new PreviousOrder(orderTone, customersOrders, pastTime);
          allPreviousOrders.push(previousOrder);
        } else {
          const pastTime = randomGenerator.generateRandomTime(31540000000, 63120000000);
          const previousOrder = new PreviousOrder(orderTone, customersOrders, pastTime);
          allPreviousOrders.push(previousOrder);
        }
      }
    }
  }
  insertObservations('orders', allPreviousOrders);
}

function insertCustomer(name, type, drinkId, foodId) {
  const customer = new Customer(name, type, drinkId, foodId);
  insertObservations('customers', [customer]);
}

async function createCustomer() {
  // TODO adjust to male and female
  const name = await nameGenerator.generateName('male');
  const customerType = CUSTOMER_TYPES[randomGenerator.generateRandomNumber(0, 2)];
  const preferredDrinkId = ObjectId(DRINKS[randomGenerator.generateRandomNumber(0, 2)]);
  const preferredFoodId = ObjectId(FOOD[randomGenerator.generateRandomNumber(0, 2)]);
  insertCustomer(name, customerType, preferredDrinkId, preferredFoodId);
}

async function deleteObservations(tableName) {
  const res = await getDatabase();
  const db = res[0];
  const client = res[1];
  const table = db.collection(tableName);
  await table.deleteMany();
  client.close();
}

function insertMenuItems() {
  // Inserts initial menu items
  const coffee = new MenuItem('Coffee', 2, 2, 3, true);
  const latte = new MenuItem('Latte', 3, 4, 2, true);
  const pizza = new MenuItem('Pizza', 12, 4, 5, false);
  const burger = new MenuItem('Burger', 11, 7, 2, false);
  const sandwich = new MenuItem('Sandwich', 10, 5, 1, false);
  const mocktail = new MenuItem('Mocktail', 5, 0, 10, true);

  insertObservations('menuItems', [coffee, latte, pizza, burger, sandwich, mocktail]);
}

function insertOrder(orders, tone) {
  const order = new Order(orders, tone);
  insertObservations('orders', [order]);
}

function createOrder() {
  const customersOrders = {};
  const customersCount = 2;
  for (let i = 0; i < customersCount; i++) {
    const customerid = ObjectId('61d9ebb334bec11525a85e24');
    const orders = {};
    const ordersCount = 3;
    for (let j = 0; j < ordersCount; j++) {
      const itemId = ObjectId('61d9eacfa3e10d2208012424');
      const itemcount = 4;
      const rating = 10;
      orders[itemId] = {
        'itemCount': itemcount,
        'rating': rating
      };
    }
    customersOrders[customerid] = orders;
  }
}
