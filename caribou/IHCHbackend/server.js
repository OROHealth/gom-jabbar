const express = require('express');


const server = express();

server.use(express.json());


server.get('/api/test',(req,res)=>{
  res.send({response:"Hellow World"});
});


const port = 5050;

server.listen(port, (console.log(`Listening on port ${port}`)));