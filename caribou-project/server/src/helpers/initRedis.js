const redis = require('redis');
const log = require('../utils/logger');

const client = redis.createClient();

// To see if a client is connected
client.once('connect', () => {
  log('info', 'Client connected to redis...', 'initRedis');
});

client.on('error', err => {
  log('error', err.message, 'initRedis');
});

client.once('ready', () => {
  log('info', 'Client connected to redis and Ready to use..', 'initRedis');
});

// When the client disconnected
client.on('end', () => {
  log('info', 'Client disconnected from redis', 'initRedis');
});

// We want to stop redis when there is a SIGINT event. When control + C is pressed.
process.on('SIGINT', () => {
  client.quit();
});
process.on('SIGTERM', () => {
  client.quit();
});

module.exports = client;
