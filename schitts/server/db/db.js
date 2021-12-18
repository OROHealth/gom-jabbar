require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/Schitts',
  {
    dialect: 'postgres',
    username: 'postgres',
    password: process.env.PSQL_PASSWORD,
    logging: false,
  }
);

async function connect() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();

module.exports = db;
