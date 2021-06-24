var schedule = require('node-schedule');
require("dotenv").config();


const express = require('express');

var googlePubSub = require('./googlePubSub.js');


const app = express();
const port = 5000;

app.get('/health', (req, res) => {
  res.send('ok');
})

app.listen(port, () => {

  console.log(`MouseTrap: app listening at http://localhost:${port}`)

  var j1 = schedule.scheduleJob('*/10 * * * * *', async function () {

    try {

      console.log('MouseTrap:  new mouse catched');

      googlePubSub.sendMessageToTopic("mouseTrap", "new_mouse");

    } catch (error) {
     // console.error(error)
    }

  });


  var j2 = schedule.scheduleJob('*/15 * * * * *', async function () {

    try {

      console.log('MouseTrap:  new rat catched');

      googlePubSub.sendMessageToTopic("mouseTrap", "new_rat");

    } catch (error) {
     // console.error(error)
    }

  });

})
