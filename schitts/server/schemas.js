// Simulation schemas

//Because I coudn't simulate properly I had to put the customer_info and menu_item schemas in the costumer_order's. Desired schemas are bellow. 

let customer_info = {
    id: {
        chance: 'guid'},
    type_of_customer: {
        values: ['out of town', 'in town', 'part of the Rose\'\s familly'],
        unique:true
    },
    customer_name:{
        faker: 'name.firstName'
    },
    drink_preferences:{
        values: ['raw milk', 'espresso', 'margarita'],
        unique:true
    },
    food_preferences:{
        values: ['panini', 'eggs à la Moira', 'David\'\s famous turkey'],
        unique:true
    }
};
let menu_item ={
    id: {
        chance: 'guid'},
    item_name:{
        values: ['raw milk', 'espresso', 'margarita', 'panini', 'eggs à la Moira', 'David\'\s famous turkey']
    },
    item_price:{
            faker: 'random.number({"min":6, "max": 22})',
        },
        
    acceptable_overcookness_level:{
        faker: 'random.number({"min":1, "max": 10})'
    },
    last_made_date:{
        faker: 'date.past()'
    },
    expiry_date:{
        faker: 'date.past()'
    },
};

let customer_order ={
    order_date:{
        faker: 'date.past(2)'
    },
    customer: customer_info,
    
    ordered_item: menu_item,
    
    order_tone:{
        values: ['angry', 'happy', 'overwhelmed', 'pregnant', 'moody', 'bored', 'excited']
    },
    num_customers:{
        faker: 'random.number({"min": 1, "max": 6})'
    },
    bill_split_type:{
        values: ['per group', 'per person', 'with ratios']
    },
    customer_feedback:{
        faker: 'random.number({"min": 1, "max": 10})'
    }
};



/*let menu ={
    menu_item:{
        hasMany:'menu_item',
        unique: true
    }
}*/



// Desired schema

const customer_info_schema = {  
    bsonType:'object',
    required:['customer_name', 'type_of_customer', 'drink_preferences', 'food_preferences'],
    properties: {
        customer_name:{
            bsonType:'string',
            description: 'must be a string and is required'
        },
        type_of_customer: {
        enum: ['out of town', 'in town', 'part of the Roses familly', null],
        description: 'can only be one of the enum values and is required'
        },
        drink_preferences:{
            bsonType:'string',
            description: 'must be a string and is required'
        },
        food_preferences:{
            bsonType:'string',
            description: 'must be a string and is required'
        },
    }
};

const customer_order_schema ={
    bsonType: 'object', 
    required: ['order_timeStamp', 'ordered_item', 'order_tone', 'num_customers', 'bill_split_type'],
    properties: {
        order_date:{
            bsonType: 'date',
            description: 'must be a date and is required'
        },
        ordered_item:{
            bsonType: 'string',
            description: 'must be a string and is required'
        },
        order_tone:{
            enum : ['angry', 'happy', 'overwhelmed', 'pregnant', 'moody', 'bored', 'excited'],
            description: 'can only be one of the enum values and is required'
        },
        num_customers:{
            bsonType:'int',
            description: 'must be an integer and is required'
        },
        customer_feedback :{
            bsonType: 'int',
            minimum:1,
            maximun:10,
            description: 'must be an integer and is required'
        },
        bill_split_type:{
            enum:['per group', 'per person', 'with ratios'],
            description: 'can only be one of the enum values and is required'
        }
    }
};

const available_menu_items_schema ={
    bsonType: 'object',
    required: ['item_name', 'item_price', 'acceptable_overcookness_level', 'last_made_date', 'expiry_date'],
    properties: {
        item_name :{
            bsonType:'string',
            description: 'must be a string and is required'
         },
        item_price:{
            bsonType:'int',
            description: "must be an integer and is required"
        },
        acceptable_overcookness_level:{
            bsonType: 'int', 
            minimum:1,
            maximun:10,
            description:'must be an integer in [ 1, 10 ] and is required'
        },
        last_made_date:{
            bsonType: 'date', 
            description: 'must be a date and is required'
        },
        expiry_date:{
            bsonType:'date',
            description: 'must be a date and is required'
        }
    }
};


module.exports ={
    customer_info,
    customer_order,
    menu_item,
}