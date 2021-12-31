const express = require("express");
const pool = require("../db/db");
const router = express.Router();

function muugrm(message){
    var superSecureMessage = "";
    for (var i =0; i<message.length;i++){
        if(isVowel(message[i])){
            superSecureMessage+= "muu";
        }
        else superSecureMessage+= "grm";
    }
    return superSecureMessage;
}

function isVowel(char){
    return 'aeiou'.includes(char);
}

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

        const message = muugrm(JSON.stringify(req.body.message));
        const query=`INSERT INTO message (inbox_id, sender_id, reciever_id, message) VALUES ($1, $2, $3, $4);`;
        const values=[req.body.inbox_id, req.body.sender_id,req.body.reciever_id,message];
        await pool.query(query, values);
        res.json(`Successfully created message:${message}`);

    }
    catch(err){
        res.status(500).json("Error trying to send message")
    }

});

module.exports = router;