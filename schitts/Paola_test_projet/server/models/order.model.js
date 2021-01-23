const mongoose = require("mongoose");
const { Schema } = mongoose;

//define the schema
const orderSchema = new mongoose.Schema(
    {  
        _id: Schema.Types.ObjectId,
        customerId: String,
        menu_item: {
            type: [
                {
                    customerId: String,
                    food: String,
                    drink: String,
                    priceFood:  Number,
                    priceDrink: Number,
                    level_cookedness: Number,
                    tone: String,
                }
            ]
        },
        nbr_customer: Number,
        split_bill: String,
        feedback: String
    },   
    {
        //allows to retrieve the date on which the order was taken
        timestamps: true,
    }  
);

//create and export the model
const Order = mongoose.model('Order', orderSchema);
module.exports =  Order;


















