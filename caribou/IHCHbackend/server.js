const express = require('express');
const server = express();

server.use(express.json());


server.get('/api/test',(req,res)=>{
  res.send({response:"Hellow World"});
});

//request presence of human in radius around a specific latitude and longitude
server.get('/api/requestPresence',(req,res)=>{
    //TODO
})


//basic signaling api takes in longitude and latitude as well as trashing level on a scale from 0-10
server.put('/api/signalHuman',(req,res)=>{
    let lat = req.query.lat;
    let long = req.query.long;
    let trashingLevel = req.query.trashingLevel
    res.send({response:"you sucessfully reported a human at: "+lat+" "+long,
    trashingLevelRes:"You reported a trashing level of:"+trashingLevel});
});

//allows the user to signal that it is ready to antler-exchange
server.put('/api/signalAntlerExchange',(req,res)=>{
    //TODO 
});


const port = 5050;

server.listen(port, (console.log(`Listening on port ${port}`)));