require('dotenv').config();

let mongoose = require('mongoose');
let { Waiter } = require('./index');

mongoose.connect(
  'mongodb+srv://schitts-admin:49AetEu2OH1liCQd@cluster0.wzdwx.mongodb.net/Schitts?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let seed = [
  {
    name: 'Twyla',
  },
  {
    name: 'Alexis',
  },
  {
    name: 'David',
  },
  {
    name: 'Moira',
  },
];

Waiter.deleteMany({})
  .then(() => Waiter.collection.insertMany(seed))
  .then((data) => {
    console.log(data);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
