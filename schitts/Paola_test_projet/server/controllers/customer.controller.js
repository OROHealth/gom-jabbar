const CustomerModel= require('../models/customer.model');
const OrderModel= require('../models/order.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");
const Menu = require('../models/menu.model');

require('dotenv').config({path: './config/.env'});

//get all the customer
module.exports.getAllCustomer = (req, res) => {
    try {
        CustomerModel.find(req.params, (err, docs) => {
            if (!err) {
                if (docs.length === 0) {
                    throw "this customer does not match to any schema"
                }
                res.send(docs);
            }               
            else
                res.status(process.env.NOT_FOUND);
        });
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//insert new customer
module.exports.createCustomer = (req, res) => {
    const newCustomer = new CustomerModel({
        _id: new mongoose.Types.ObjectId(),
        name_customer : req.body.name_customer,
        type_customer : req.body.type_customer,
        drink_preference : [],
        food_preference : []
    }
    );
    if (newCustomer.length === 0) {
        throw "this customer does not match to any schema"
    }
    try {
        newCustomer.save((err, docs) => {
            if (!err) res.send(docs);
            else res.status(process.env.BAD_REQUEST).send(err);
        })
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//get customer's info
module.exports.customerInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(process.env.ID_NOT_ACCEPTABLE).send('ID unknown : ' + req.params.id)
    try {
        CustomerModel.findById(req.params.id, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(process.env.NOT_FOUND);
        });
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//get the query data
module.exports.typeInfo = (req, res) => {
    const typeCustomer = req.params.type;

    //recherche la donnée saisit dans l'input sans prendre en compte les majuscules et minuscules
    const query = { 'type_customer': { $regex: new RegExp(`${typeCustomer}`), $options: 'i' } };

    try {
        CustomerModel.find(query, (err, docs) => {
            if (!err) {
                if (docs.length === 0) {
                    throw "this type of customer does not exist"
                }
                res.send(docs);
            } 
            else res.status(process.env.NOT_FOUND);
        });
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
    
}