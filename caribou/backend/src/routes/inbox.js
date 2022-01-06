const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    if(req.session.user != undefined && req.session.user.email != undefined){
    //get current user id
    const currentUserId = await pool.query(`SELECT "id" FROM "caribou" WHERE "email"='${req.session.user.email}'`)
    //try to get the inbox for current user and selected user
    try{
        const inbox_id = pool.query(`SELECT * FROM "inbox" WHERE ("user1_id"=${req.body.user1_id} AND "user2_id"=${currentUserId}) OR ("user1_id"=${currentUserId} AND "user2_id"=${req.body.user1_id})`);
    }
    catch{
      console.log("error while trying to find existing inbox")
    }
    if(query!=undefined){
      res.json(inbox_id);
    }
    else{
      //Create inbox for the two users
      const new_inbox_id = pool.query(`INSERT INTO inbox (user1_id, user2_id) VALUES (${req.body.user1_id},${currentUserId})`);
      res.json(new_inbox_id);
    }
  }
    else{
      console.log("you need to be signed in in order to use the chat functionality")
    }
  })
  .post(async (req, res) => {
    try {
      const query = `INSERT INTO inbox (user1_id,user2_id) VALUES ($1, $2);`;
      const values = [req.body.user1_id, req.body.user2_id];
      await pool.query(query, values);
      res.json("Successfully created the inbox");
    } catch (err) {
      res.status(500).json("Failed to create inbox");
      console.log(err);
    }
  });

router.get("/seen", (req, res) => {
  //return seen status
});

module.exports = router;
