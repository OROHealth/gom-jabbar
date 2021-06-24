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

  console.log(`CadaverExchange: app listening at http://localhost:${port}`)


  googlePubSub.subscribeToTopic("mouseTrap");

  var j1 = schedule.scheduleJob('*/10 * * * * *', async function () {

    try {

      console.log('CadaverExchange:  new mouse exchange');

      googlePubSub.sendMessageToTopic("CadaverExchange", "new_mouse_exchange");

    } catch (error) {
     // console.error(error)
    }

  });


  var j2 = schedule.scheduleJob('*/15 * * * * *', async function () {

    try {

      console.log('CadaverExchange:  new rat exchange');

      googlePubSub.sendMessageToTopic("CadaverExchange", "new_rat_exchange");

    } catch (error) {
     // console.error(error)
    }

  });

})
