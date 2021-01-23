const mongoose = require("mongoose");
const { Schema } = mongoose;
 require('./menu.model');

//define the schema
const customerSchema = new mongoose.Schema(
    {  
        _id: Schema.Types.ObjectId,
        name_customer : {
            type: String,
        },
        type_customer: {
            type: String,
        },
        drink_preference: [String],
        food_preference: [String],
    },
    // {
    //     //allows to retrieve the date on which the order was taken
    //     timestamps: true,
    // }  
);



//create and export the model
const Customer = mongoose.model('Customer', customerSchema);
module.exports =  Customer;
