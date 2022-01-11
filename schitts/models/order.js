const moment = require('moment');

module.exports = class Order {
    constructor(tone, customersOrders) {
        this.customersOrders = customersOrders; 
        this.dateCreated = moment.utc();
        this.tone = tone;
        this.getCustomerCount(customersOrders);
        // TODO create billSplitPerCustomer function 
        // TODO create billSplitRatio function
    }

    getCustomerCount(customersOrders) {
        this.customersCount = Object.keys(customersOrders).length;
    }

    getBillSplitPerCustomer(customersOrders) {
        console.log('getBillSplitPerCustomer')
    }

}