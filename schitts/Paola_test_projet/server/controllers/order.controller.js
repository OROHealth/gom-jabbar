const OrderModel= require('../models/order.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");

require('dotenv').config({path: './config/.env'});

const ROUND_TO_TWO_DECIMAL = 100;
const NUMBER_LEVEL_COOKEDNESS = 8;

//get date for the last 144 hours
let date = new Date();
date.setMonth(date.getMonth()-2);

//get all the order
module.exports.getAllorder = (req, res) => {
    try {
        OrderModel.find((err, docs) => {
            if (!err)
                res.send(docs);
            else
                res.status(process.env.NOT_FOUND).send(err);
        })
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//insert new order
module.exports.createOrder = (req, res) => {
    
    const newOrder = new OrderModel({
        _id: new mongoose.Types.ObjectId(),
        menu_item: [],
        tone: req.body.tone,
        nbr_customer: req.body.nbr_customer,
        split_bill: req.body.split_bill,
        feedback: req.body.feedback
    });
    if (newOrder.length === 0) {
        throw "this order does not match to any schema"
    }
    try {
        newOrder.save((err, docs) => {
            if (!err)
                res.send(docs);
            else
                res.status(process.env.BAD_REQUEST).send(err);       
        })
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//patch customer's order
module.exports.menuAdd = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(process.env.ID_NOT_ACCEPTABLE).send('ID unknown : ' + req.params.id)
    try{
        return OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    menu_item: {
                        customerId: req.body.customerId,
                        food: req.body.food,
                        drink: req.body.drink,
                        priceFood:  req.body.priceFood,
                        priceDrink: req.body.priceDrink,
                        level_cookedness: req.body.level_cookedness,
                        tone: req.body.tone,
                    }
                }   
            },
            {new: true},
            (err,docs) => {
                if(!err)
                    res.send(docs);
                else 
                    res.status(process.env.NOT_FOUND).send(err);
            }
        )
    }catch(err){
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}

//update order
module.exports.updateOrder = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(process.env.ID_NOT_ACCEPTABLE).send("ID unknown : " + req.params.id);
    try {
        const updatedRecord = {
            split_bill: req.body.split_bill,
            feedback: req.body.feedback
        };
  
        OrderModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(process.env.NOT_FOUND).send(err);
            }
        );
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
};

//get order's info
// module.exports.orderInfo = (req, res) => {
//     if(!ObjectID.isValid(req.params.id))
//         return res.status(400).send('ID unknown : ' + req.params.id)
    
//         OrderModel.findById(req.params.id, (err, docs) => {
//         if(!err) res.send(docs);
//         else console.log('ID unknown : ' + err);
//     });
// };

//get the total bill
module.exports.totalBill = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(process.env.ID_NOT_ACCEPTABLE).send('ID unknown : ' + req.params.id)
    try {
        OrderModel.aggregate([
            {
                $match: {
                    _id: ObjectID(req.params.id),
                }
            },
            {
                $project: {
                    total: { $sum: "$menu_item.priceFood" },
                    total2: { $sum: "$menu_item.priceDrink" },
                }
            },
            {
                $addFields: {
                    totalBill: { $sum: ["$total", "$total2"] }
                }
            }
        ],
            (err, docs) => {
                if (!err) {
                    if (docs.length === 0) {
                        throw "this request does not match to anything in database"
                    } else {
                        res.send(docs)
                    }
                } else {
                    res.status(process.env.BAD_REQUEST).send(err)
                }
            })
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
};

//get all the 8-rated overcooked diner did serve in the last 144 hours
module.exports.dinerInfo = (req, res) => {
    try {
        OrderModel.aggregate([
            {
                $match: {
                    "menu_item.level_cookedness": NUMBER_LEVEL_COOKEDNESS,
                    createdAt: { $gte: date }
                }
            },
            {
                $project: {
                    menu_item: {
                        $filter: {
                            input: "$menu_item",
                            as: "menu_item",
                            cond: { $eq: ["$$menu_item.level_cookedness", NUMBER_LEVEL_COOKEDNESS] }
                        }
                    },
                    createdAt: { $dateToString: { 'format': '%Y-%m-%d à %Hh%M', 'date': '$createdAt' } }
                }
            },
            {
                $addFields: {
                    total: { $sum: "$menu_item.priceFood" },
                }
            }
        ],

            (err, docs) => {
                if (!err) {
                    if (docs.length === 0) {
                        throw "this request does not match to anything in database"
                    } else {
                        res.send(docs)
                    }
                } else {
                    res.status(process.env.BAD_REQUEST).send(err)
                }     
            }
        )

    } catch(err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
    
}

//get the median value
module.exports.meanValue = (_req, res) => {
    try {
        OrderModel.aggregate([
            {
                $match: {
                    "menu_item.level_cookedness": NUMBER_LEVEL_COOKEDNESS,
                    createdAt: { $gte: date }
                }
            },
            {
                $project: {
                    menu_item: {
                        $filter: {
                            input: "$menu_item",
                            as: "menu_item",
                            cond: { $eq: ["$$menu_item.level_cookedness", NUMBER_LEVEL_COOKEDNESS] }
                        }
                    },
                }
            },
            {
                $project: {
                    total: { $sum: "$menu_item.priceFood" },
                     
                }
            }
        ],

        function (err, docs, orderAscendingTable, medianValue, totalEarned) {
            let totalMoney = 0;
            if (!err) {
                
                if (docs.length === 0) {
                    throw "this request does not match to anything in database"
                } else {

                    //calculate the total earned
                    tabTotalResult = docs.map(element => {        
                    totalMoney = element.total + totalMoney;
                    let roundNumber = Math.round(totalMoney * ROUND_TO_TWO_DECIMAL) / ROUND_TO_TWO_DECIMAL;                        
                    return roundNumber
                    });
                        
                    totalEarned = parseFloat((tabTotalResult.slice(-1)));

                    //calculate the median value
                    docs = docs.map(element => {        
                        return element.total
                    });
            
                    orderAscendingTable = docs.slice(0).sort((element, nextElement) => { return element - nextElement });

                    let indexOfMedianValue = (orderAscendingTable.length + 1) / 2;

                    medianValue = (orderAscendingTable.length % 2) ? orderAscendingTable[indexOfMedianValue - 1] : (orderAscendingTable[indexOfMedianValue - 1.5] + orderAscendingTable[indexOfMedianValue - 0.5]) / 2
            
                    //check if results is an integer
                    parseMedianValue = (Number.isInteger(medianValue)) ? medianValue : parseInt(medianValue, 10);
            
                    //send the result in format json;
                    res.send({ median: parseMedianValue, totalEarned: totalEarned });
                }
            } else {
                res.status(process.env.BAD_REQUEST).send(err)
            }
        })
    } catch (err) {
        return res.status(process.env.INTERNAL_SERVER_ERROR).send(err);
    }
}