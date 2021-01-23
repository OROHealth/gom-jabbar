const mongoose = require("mongoose");

//define the schema
const menuSchema = new mongoose.Schema(
    {  
        name_item: String,
        price:  Number,
        level_cookedness: Number,
        made_date:  Date,
        conservation_time: Number,
    },   
    {
        //allows to retrieve the date on which the order was taken
        timestamps: true,
    }  
);

//create and export the model
const menu = mongoose.model('Menu', menuSchema);
module.exports =  menu;