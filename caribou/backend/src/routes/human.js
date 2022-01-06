const express = require("express");
const res = require("express/lib/response");
const pool = require("../db/db");
const router = express.Router();

//human signaling api takes in longitude and latitude, trashing levels and levels of excitement and updates the db accordingly
router.put("/signal", async (req, res) => {
  try {
    let lat = req.body.lat;
    let lng = req.body.lng;
    let trashingLevel = req.body.trashingLevel;
    let excitementLevel = req.body.excitementLevel;

    const query = `INSERT INTO "human" ("lat","lng","trashing_level","excitment_level") VALUES($1,$2,$3,$4) RETURNING *;`;
    const values = [lat, lng, trashingLevel, excitementLevel];

    await pool.query(query, values, (err) => {
      res.json("query error");
      console.log(err);
    });
  } catch (err) {
    console.log("Error");
    res.json("Couldn't signal human");
  }
});

//returns all humans
router.get("/getAllHumans", async (req, res) => {
  //TODO implement geohashing in order to focus search on specific area instead of loading every single human
  try {
    const query = `SELECT * FROM "human"`;
    const response = await pool.query(query);
    res.json(response);
  } catch (err) {
    res.json("Couldn't get humans");
  }
});

//request presence of human in radius around a specific latitude and longitude
router.get("/requestPresence", (req, res) => {
  //TODO
});

module.exports = router;
