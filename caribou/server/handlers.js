const assert = require("assert");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const saltRounds = 10;

//HANDLERS

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const user = {
    _id: req.body._id,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, saltRounds),
  };
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    const r = await db.collection("users").insertOne(user);
    assert.strictEqual(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
const logIn = async (req, res) => {
  const _id = req.body.email;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    const r = await db.collection("users").findOne({ _id }, (err, result) => {
      if (result && bcrypt.compareSync(req.body.password, result.password)) {
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
const seeHumans = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    const humans = await db.collection("humans").find().toArray();
    res.status(200).json({ status: 200, data: humans });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};
const addHuman = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    const r = await db.collection("humans").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
const removeHuman = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("gom-jabbar");
    await db
      .collection("humans")
      .findOneAndDelete({ _id: ObjectId(req.body._id) });
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {
  logIn,
  addUser,
  addHuman,
  removeHuman,
  seeHumans,
};
