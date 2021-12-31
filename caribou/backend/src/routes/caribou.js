const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const bcrypt = require("bcrypt");

//sign-up
router.post("/signup", async (req, res) => {
  //TODO input validation
  try {
    const caribouExisting = await pool.query(
      `SELECT "email" FROM "caribou" WHERE "email"='${req.body.email}'`
    );
    
    if (caribouExisting.rowCount === 0) {
      // register new user
      //hash and salt
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      //insert into db
      console.log(hashedPass);
      const query = `INSERT INTO caribou (email, password, name) VALUES ($1, $2, $3) RETURNING *;`;
      const values = [req.body.email, hashedPass, req.body.name];
      const newUserQuery = await pool.query(query, values);
      //create session
      req.session.user = {
        email: req.body.email,
        id: newUserQuery.rows[0].id,
      };

      res.json({ loggedIn: true, email: req.body.email });
    } else {
      res.json({ loggedIn: false, status: "email already in use" });
    }
  } catch (err) {
      console.log(err);
    res.status(500).json("Error while trying to signup");
  }
});

//login with email and passwork
router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.email) {
      res.json({ loggedIn: true, email: req.session.user.email });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    //TODO validate input
    try {
      const caribou = await pool.query(
        `SELECT * FROM "caribou" WHERE "email"=\'${req.body.email}\'`
      );

      if (caribou.rowCount > 0) {
        const correctPassword = await bcrypt.compare(
          req.body.password,
          caribou.rows[0].password
        );
        if (correctPassword) {
          req.session.user = {
            email: req.body.email,
            id: caribou.rows[0].id,
          };
          res.json({ loggedIn: true, email: req.body.email });
        } else {
          res.json({
            loggedIn: false,
            status: "Wrong username or password!",
          });
          console.log("login failed");
        }
      } else {
        console.log("login failed");
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
    } catch (err) {
        console.log(err);
      res.status(500).json("Error while trying to login");
    }
  });

//create a caribou ONLY FOR DEBUGGING REMOVE
router.post("/createCaribou", async (req, res) => {
  try {
    const query = `INSERT INTO caribou (email, password, name) VALUES ($1, $2, $3);`;
    const values = [req.body.email, req.body.password, req.body.name];
    await pool.query(query, values);
    res.json("Succesfully created caribou");
  } catch (err) {
    res.status(500).json("Could not insert new caribou into database");
  }
});

//allows the user to signal that it is ready to antler-exchange
router.put("/signalAntlerExchange", (req, res) => {
  //TODO
});

module.exports = router;
