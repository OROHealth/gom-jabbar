const express = require("express");
const pool = require("../db/db");
const router = express.Router();

//create a caribou
router.post("/createCaribou", async(req,res)=>{
    try{
        const query = `INSERT INTO caribou (email, password, name) VALUES ($1, $2, $3);`;
        const values = [req.query.email,req.query.password,req.query.name];
        await pool.query(query,values);
        res.json("Succesfully created caribou");
    }
    catch(err){
        res.status(500).json("Could not insert new caribou into database")
    }
});

//allows the user to signal that it is ready to antler-exchange
router.put('/signalAntlerExchange',(req,res)=>{
    //TODO 
});


module.exports = router;