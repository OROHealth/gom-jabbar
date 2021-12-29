const express = require('express');
const cors = require('cors');
const server = express();
const pool = require("./db");

server.use(cors());
server.use(express.json());


//create a caribou
server.post("/api/caribou", async(req,res)=>{
    try{
        const query = `INSERT INTO caribou (email, password, name) VALUES ($1, $2, $3) RETURNING *`;
        const values = [req.query.email,req.query.password,req.query.name];
        const newCaribou = await pool.query(query,values,function (err, result) {
            if (err) throw err;
          });
        res.json(newCaribou);
    }
    catch(err){
        res.status(500).json("Could not insert new caribou into database")
    }
});


process.on('uncaughtException', function (err) {
    console.log(err);
}); 


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