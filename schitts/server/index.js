"use-strict";

const express = require("express");
const bodyParser = require("./node_modules/body-parser");
const morgan = require("morgan");
const mocker = require('mocker-data-generator').default;
require("dotenv").config();


const {customer_info, customer_order, menu_item} = require("./schemas");
let MongoClient = require('mongodb').MongoClient;
let db;
const uri = process.env.MONGO_URI;
const PORT = 4000;
let app = express();

app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(morgan("tiny"));
app.use(express.static("./server"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));


// Establish the connection with the db then start the app

MongoClient.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true} ,function(err, database) {
        if(err) throw err;
    
        db = database.db("ORO_TEST")
        app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
});

let num_of_orders_year_one ;
let num_of_orders_year_two ;
let total_num_orders;


// Create a random num of orders * num of customers
const getRndOrders = (min, max) =>{
    num_of_orders_year_one = Math.floor(Math.random() * (max - min + 1) ) + min;
    num_of_orders_year_two = Math.floor(Math.random() * (max - min + 1) ) + min;
    return(total_num_orders = (num_of_orders_year_one + num_of_orders_year_two) *10000)
};
getRndOrders(14, 2);


// Post a customer's info into the appropriate db collection

app.post('/customer_info', async (req, res) =>{
    const customer_infos = req.body;
    try {
        await db.collection("customer_info")    
        .insertOne({
                customer_info: customer_infos,
                type_of_customer: customer_infos.type_of_customer,
                customer_name: customer_info.customer_name,
                drink_preferences: customer_info.drink_preferences,
                food_preferences: customer_info.food_preferences
            });
        res.status(200).json({
            status: 200,    
            message: 'Customer created!',
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err
    });  
}});


// Post a customer's order into the approrate db collection

app.post("/customer_order", async(req, res) =>{
    const customer_order = req.body;
    const date = new Date(customer_order.order_date)

    try {
        // we retrieve both the customer_info and menu_item objects from their respective collection to 'link' them to the customer's order
        const customer_filter = {customer_name : customer_order.customer};
        const menu_filter={item_name : customer_order.ordered_item };


        //if a customer is not in the collection we throw an error
        const get_customer = await db.collection('customer_info').find(customer_filter).toArray()
        if(get_customer.length === 0 ){
            throw "that customer is not registered"
        };

        // if an ordered item is not on the menu collection we throw an error
        const get_ordered_item = await db.collection('menu_items').find(menu_filter).toArray()
        if(get_ordered_item.length === 0 ){
            throw 'that item does is not on the menu'
        };

        // If there is no errors, we insert a new document in the customer order collection
        const order= await db.collection("customer_order")
        .insertOne({
            order_date: date,
            customer: get_customer,
            ordered_item: get_ordered_item,
            order_tone: customer_order.order_tone,
            num_customers: customer_order.num_customers,
            customer_feedback: customer_order.customer_feedback,
            bill_split_type: customer_order.bill_split_type
        });
       
        res.status(201).json({
            status: 201,
            message:'Your order has been created!',
            order:order
        });
    } catch(err){
        res.status(500).json({
            message:'Something went wrong', 
            error: err
        });
    };
}) ;

app.post('/menu_items', async(req,res) =>{
    const menu_item = req.body;
    const last_made_date = new Date(menu_item.last_made_date);
    const expiry_date = new Date(menu_item.expiry_date);

    try {
        await db.collection('menu_items')
        .insertOne({
            item_name: menu_item.item_name,
            item_price: menu_item.item_price,
            acceptable_overcookness_level : menu_item.acceptable_overcookness_level,
            last_made_date: last_made_date,
            expiry_date:expiry_date
        });
        res.status(200).json({
            status: 200,
            message:'An item has been added to the menu!'
        });
    } catch(err) {
        res.status(500).json({
            message: 'Something went wrong', 
            error: err
        });
    };
});

app.post('/simulation', async(req, res)=>{
    const start_simulation = req.body;
    let data = mocker()
    .schema('customer_order', customer_order, total_num_orders)
    .buildSync();
    const simulate_orders = data.customer_order;

    try {
        if(start_simulation.simulation === false){
            throw 'Restart the simulation first!'
        };

        await db.collection('test').insertMany(simulate_orders)

        res.status(201).json({
            status:201, 
            message:'Simulation Created'
        });
    } catch(err) {
        res.status(500).json({
            status:500, 
            message: "Something went wrong",
            err: err
        });
    }
});

app.delete('/simulation', async(req, res)=>{
    try{
        await db.collection('test').drop()
        res.status(200).json({
            status:200, 
            message:'Simulation deleted'
        });
    } catch(err) {
        res.status(500).json({
            status:500, 
            message:"Something went wrong", 
            err: err 
        });
    };

});

app.get('/moiras_performance', async(req, res) =>{
    try{
        //Get the items where accepted over-cookness level is 8 from the menu
        const menu_collection = db.collection('menu_items')
        const query_menu_by_acceptability = { acceptable_overcookness_level: 8}
        const menu_results = await menu_collection.find(query_menu_by_acceptability).toArray();
        let menu_item_array =[];
        menu_results.map(items=>{
            menu_item_array.push(items.item_name)
        });
        //Query the last 6 months of orders
        const order_collection = db.collection('test')
        const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()
        const getDate = (input, months) => {
        let date = new Date(input)
        date.setDate(1)
        date.setMonth(date.getMonth() + months)
        date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth()+1)))
        return  date
        };
        const six_month_ago = getDate(new Date(), -6);
        const today = new Date()

        // To prevent vast amounts of data transer, we only send back the queried values to the FE and not the whole documents. 
        const filter_last_6_months = await order_collection.aggregate(
            [
                {$match: {$and :[{order_date : {$gte: six_month_ago, $lte: today}}, {'ordered_item.item_name':{ $in :menu_item_array}}]}},
                {
                    $group:
                        {
                            _id : "",
                            lvl8_meals: {$sum: 1}, 
                            earnings :{$sum :"$ordered_item.item_price"},
                    /* 
                        My free Mongo Atlas tier does not seem to allow for that median calculation :( I do it another way below

                    median: {
                        $accumulator: {
                        accumulateArgs: ["$customer_feedback"],
                        init: function() { return []; },
                        accumulate: function(bs, b) { return bs.concat(b); },
                        merge: function(bs1, bs2) { return bs1.concat(bs2); },
                        finalize: function(bs) {
                            bs.sort(function(a, b) { return a - b });
                            var mid = bs.length / 2;
                            return mid % 1 ? bs[mid + 0.5] : (bs[mid - 1] + bs[mid]) / 2;
                        },
                        }
                    }*/
                        }
                }
            ]
        ).toArray();

        //the dreaded median calculation:
        const get_ratings = await order_collection
        .find({ $and :[{order_date : {$gte: six_month_ago, $lte: today}}, {'ordered_item.item_name':{ $in :menu_item_array}}]})
        .toArray();

        let temp_array =[];
        get_ratings.map(order=>{
            temp_array.push(order.customer_feedback)
        });

        temp_array.sort(function(a,b){return a-b});
        let mid = temp_array.length /2;
        let median = mid %1 ? temp_array[mid -0.5]: (temp_array[mid -1] + temp_array[mid] / 2);

        res.status(201).json({
            status: 201,
            data: filter_last_6_months,
            median_rating: median
        });

    } catch(err) {
        res.status(500).json({
            message: 'Something went wrong', 
            error: err
        });

    };
});

app.get('/out_of_town_customer', async(req, res) =>{
    try{
    const customer_collection = db.collection('customer_info');
    const query = {type_of_customer:"out of town"};

    const find_user = await customer_collection.find(query).toArray();

    res.status(201).json({
        status:201, 
        data:find_user
    });
    } catch(err) {
        res.status(500).json({
        status:500, 
        error:err
        });
    };
});