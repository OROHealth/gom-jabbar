const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router.route('/').get(async (req,res)=>{
    //TODO 

}).post(async (req,res)=>{
    try{
        const query = `INSERT INTO inbox (user1_id,user2_id) VALUES ($1, $2);`
        const values = [req.body.user1_id, req.body.user2_id];
        await pool.query(query,values);
        res.json("Successfully created the inbox");
    }
    catch(err){
        res.status(500).json("Failed to create inbox");
        console.log(err);
    }    
});

router.get("/seen", (req,res)=>{
    //return seen status
});

module.exports = router;