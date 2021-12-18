const db = require('./db');
const { User } = require('./models');
const Order = require('./models/order');
const Item = require('./models/item');
const Customer = require('./models/customer');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await User.create({
    username: 'Twyla',
  });

  await User.create({
    username: 'Eric',
  });

  await User.create({
    username: 'Tom',
  });

  await User.create({
    username: 'Patricia',
  });

  await User.create({
    username: 'Luca',
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
