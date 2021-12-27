module.exports = {
  development: {
    HOST: process.env.DB_HOST || '127.0.0.1',
    USER: process.env.DB_USERNAME || 'ezdoc_mc_a',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DATABASE: process.env.DB_DATABASE || 'node_api',
    PORT: process.env.DB_PORT || '3306',
    dialect: 'mysql',
    logging: true,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    PORT: process.env.DB_PORT,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
