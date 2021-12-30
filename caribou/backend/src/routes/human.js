const express = require("express");
const pool = require("../db/db");
const router = express.Router();

//basic signaling api takes in longitude and latitude as well as trashing level on a scale from 0-10
router.post("/signal", (req, res) => {
  let lat = req.query.lat;
  let lng = req.query.long;
  let trashingLevel = req.query.trashingLevel;
  let excitementLevel = req.query.excitementLevel;
  res.json({
    response: `you sucessfully reported a human at lat: ${lat} long:${lng} `,
    trashingLevelRes: "You reported a trashing level of:" + trashingLevel,
    excitementLevelRes: `You reported an excitement leve of:${excitementLevel}`
  });
});

router.get("/getAllHumans",(req,res)=>{
  const query = `SELECT * FROM human`;
  res.json(query);
});

//request presence of human in radius around a specific latitude and longitude
router.get("/requestPresence",(req,res)=>{
    //TODO
})


module.exports = router;
