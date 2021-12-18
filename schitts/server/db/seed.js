const db = require('./db');
const { User } = require('./models');
const Order = require('./models/order');
const Item = require('./models/item');
const Customer = require('./models/customer');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const names = [
    'Twyla',
    'Eric',
    'Tom',
    'Patricia',
    'Luca',
    'Alex',
    'Joe',
    'Rebecca',
    'Patricia',
  ];

  for (let i = 0; i < names.length; i++) {
    await User.create({
      username: names[i],
    });
  }

  await Item.create({
    type: 'drink',
    name: 'Frappaccino',
    price: 5,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '2 days',
  });

  await Item.create({
    type: 'drink',
    name: 'Mocha',
    price: 4,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '1 day',
  });

  await Item.create({
    type: 'drink',
    name: 'Milk',
    price: 3,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '10 days',
  });

  await Item.create({
    type: 'food',
    name: 'Pizza',
    price: 4,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '1 day',
  });

  await Item.create({
    type: 'food',
    name: 'Bagel',
    price: 4,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '12 hours',
  });

  await Item.create({
    type: 'food',
    name: 'Cheesecake',
    price: 5,
    acceptableLevel: 7,
    date: Date.now(),
    lengthOfTime: '4 days',
  });

  console.log(`seeded users and orders`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
