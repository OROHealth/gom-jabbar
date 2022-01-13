const moment = require('moment');
const { MENU_ITEMS_PRICES } = require('../constants');

module.exports = class Order {
    constructor(tone, customersOrders) {
    // Similar to order model, except for dateCreated uses moment.utc() 
    // to automatically insert time of order
    /*
      customersOrder = {
        customerId1 : {
          menuItemId: {
            count: int,
            feedback: int
          }
        },
        customerId2 : {
          menuItemId: {
            count: int,
            feedback: int
          }
        }
      }
    */
        this.customersOrders = customersOrders;
        this.dateCreated = moment.utc();
        this.tone = tone;
        this.getCustomerCount(customersOrders);
        this.getBillSplitPerCustomer(customersOrders);
        this.getBillSplitRatio(this.getBillSplitPerCustomer(customersOrders));
    // TODO create billSplitPerGroup function
    }

    getCustomerCount(customersOrders) {
        this.customersCount = Object.keys(customersOrders).length;
    }

    getBillSplitPerCustomer(customersOrders) {
        let billSplit = {};
        let i = 0;
        for (const [key, value] of Object.entries(customersOrders)) {
            let total = 0;
            const customerId = key;
            for (const [key, value] of Object.entries(customersOrders[customerId])) {
                const menuItem = key.toString();
                const itemPrice = MENU_ITEMS_PRICES[menuItem];
                let quantity = value.count;
                total += quantity * itemPrice;
            }
            i += 1;
            billSplit[i] = total;
        }
        this.billSplitPerCustomer = billSplit;
        return billSplit;
    }

    getBillSplitRatio(billSplit) {
        let total = 0;
        let billSplitRatio = {};
        for (const [key, value] of Object.entries(billSplit)) {
            total += value;
        }
        for (const [key, value] of Object.entries(billSplit)) {
            billSplitRatio[key] = value / total;
        }
        this.billSplitRatio = billSplitRatio;
    }
};
