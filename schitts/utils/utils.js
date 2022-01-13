const moment = require('moment');

function generateRandomTime(min, max) {
    const currentTime = moment.now();
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomDelta = Math.floor(Math.random() * (max - min + 1)) + min;
    const pastTime = currentTime - randomDelta;
    return pastTime;
}

function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

module.exports = {
    generateRandomTime,
    generateRandomNumber,
};
