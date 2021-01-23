const MenuModel = require('../models/menu.model');
const CustomerModel = require('../models/customer.model');
const ObjectID = require('mongoose').Types.ObjectId;

// module.exports.getAllMenu = (req, res) => {
//     MenuModel.find((err, docs)=>{
//         if(!err)
//             res.send(docs);
//         else 
//             console.log("error: " + err);
//     })
// }

// module.exports.menuInfo = (req, res) => {
//     if(!ObjectID.isValid(req.params.id))
//         return res.status(400).send('ID unknown : ' + req.params.id)
    
//         MenuModel.findById(req.params.id, (err, docs) => {
//         if(!err) res.send(docs);
//         else console.log('ID unknown : ' + err);
//     }).select();
// }

// module.exports.createMenu = (req, res) => {
//     const newMenu = new MenuModel({
//         name_item : req.body.name_item,
//         price : req.body.price,
//         level_cookedness : req.body.level_cookedness,
//         made_date : req.body.made_date,
//         conservation_time : req.body.conservation_time,
//     });

//     newMenu.save((err, docs) => {
//         if(!err)
//             res.send(docs);
//         else 
//             console.log('error: ' + err);
//     })
// }