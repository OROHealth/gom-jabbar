const assert = require("assert");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const test = async (req, res) => {
  res.status(200).send("bacon");
};
const addUser = async (req, res) => {};
const logIn = async (req, res) => {
  const _id = req.body.email;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    const r = await db.collection("users").findOne({ _id }, (err, result) => {
      if (result && result.password === req.body.password) {
        res.status(200).json({ status: 200, _id, data: result });
      } else if (result) {
        res.status(401).json({ status: 401, _id, data: "Incorrect password" });
      } else {
        res.status(404).json({ status: 404, _id, data: "Not Found" });
      }
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};
const seeHumans = async (req, res) => {};
const addHuman = async (req, res) => {};
const removeHuman = async (req, res) => {};

module.exports = {
  test,
  logIn,
  addUser,
  addHuman,
  removeHuman,
  seeHumans,
};
