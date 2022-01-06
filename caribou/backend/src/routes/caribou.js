const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

//sign-up
router.post("/signup", async (req, res) => {
  //TODO input validation
  try {
    const caribouExisting = await pool.query(
      `SELECT "email" FROM "caribou" WHERE "email"='${req.body.email}'`
    );

    if (caribouExisting.rowCount === 0) {
      //check that the email has the correct extension
      if (req.body.email.split("@")[0].slice(-5) != "carib") {
        res.json({ loggedIn: false, status: "email needs to be Cariboued" });
        return;
      }

      // register new user
      //hash and salt
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      //insert into db
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

//login with email and password
router
  .route("/login")
  .get(async (req, res) => {
    //check if logged in
    if (req.session.user && req.session.user.email) {
      res.json({ loggedIn: true, email: req.session.user.email });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    //Login using password and email

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
          //create session
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

router.put("/signOut", async (req, res) => {
  req.session.destroy();
  res.json({ status: "successful" });
});

//allows the user to signal that it is ready to antler-exchange
router.put("/signalAntlerExchange", async (req, res) => {
  try {
    //user session needed to set antler-exchange status
    if (req.session.user != undefined && req.session.user.email != undefined) {
      const query = `UPDATE "caribou" SET "antler_exchange_status"='${req.body.antlerExchangeStatus}' WHERE "email"='${req.session.user.email}'`;
      console.log(query);
      await pool.query(query, (err) => {
        res.json("query error");
      });
    } else {
      console.log("not signed in");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not change antler exchange status");
  }
});

//fetch all users that are ready to accept antler exchange
router.get("/getAntlerExchanges", async (req, res) => {
  try {
    const query = `SELECT * FROM "caribou" WHERE "antler_exchange_status" = 'true' LIMIT 50;`;
    console.log("getting all caribous ready to accept antler exchange");
    const caribous = await pool.query(query);
    if (caribous !== undefined) res.json(caribous.rows);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("unable to return caribous that are ready to antler exchange");
  }
});

module.exports = router;
