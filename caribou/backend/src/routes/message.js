const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router.route('/').get(async (req,res)=>{
    //get list of messages(if no param load last 10 and load more otherwise)
    try{
        const query = "SELECT * FROM (SELECT * FROM message WHERE inbox_id = $1 ORDER BY created_timestamp DESC LIMIT $2) AS x ORDER BY created_timestamp ASC;";
        const values=[req.query.inbox_id,req.query.nbr_to_load]
        const response = await pool.query(query, values);
        res.json(response.rows);
    }
    catch(err){
        res.status(500).json("Error trying to get latest messages")
    }
}).post(async (req,res)=>{
    try{
        const query=`INSERT INTO message (inbox_id, sender_id, reciever_id, message) VALUES ($1, $2, $3, $4);`
        const values=[req.query.inbox_id, req.query.sender_id,req.query.reciever_id,req.query.message];
        await pool.query(query, values);
        res.json("Successfully created message");

    }
    catch(err){
        res.status(500).json("Error trying to send message")
    }

});

module.exports = router;