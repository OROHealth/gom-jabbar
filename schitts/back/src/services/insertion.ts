import BillsController from '../controllers/bills';
import CustomersController from '../controllers/customers';
import CustomerTypesController from '../controllers/customerTypes';
import ItemTypesController from '../controllers/itemTypes';
import MenuItemsController from '../controllers/menuItems';
import TonesController from '../controllers/tones';
const { rando } = require('@nastyox/rando.js');
import subDays from 'date-fns/subDays';
import MenusController from '../controllers/menus';
import OrdersController from '../controllers/orders';
import { Customers } from '../models/customers';
import { Orders } from '../models/orders';
import { ICustomerTypes } from '../models/customerTypes';
import { IMenuItems } from '../models/menuItems';

const insertion = async (props: { [key: string]: number }): Promise<{ [key: string]: number }> => {
	const { nbUsers, orderMin, orderMax, spanYears } = props;

	if (nbUsers && nbUsers > 0 && orderMin && orderMax && spanYears) {

		const customerTypes = await CustomerTypesController.getAll();
		const foodType = await ItemTypesController.findOne('Food');
		const drinkType = await ItemTypesController.findOne('Drink');
		const foodsList = await MenuItemsController.getByType(foodType);
		const drinksList = await MenuItemsController.getByType(drinkType);
		const menusList = await MenusController.getAll();
		const tonesList = await TonesController.getAll();

		for (let i = 0; i < nbUsers; i++) {
			//Random male or female
			const gender: string = rando(['John', 'Jane']).value;

			//Add customers
			const firstName = `${gender}${i}`;
			const type:ICustomerTypes = rando(customerTypes).value;
			const drinkPreferences:IMenuItems[] = [rando(drinksList).value];
			const foodPreferences:IMenuItems[] = [rando(foodsList).value];

			const newCustomer = await CustomersController.add(firstName, type, drinkPreferences, foodPreferences);

			if (newCustomer) {
				//Orders
				const nbOrders = orderMax >= orderMin ? rando(orderMin - orderMax) : 1;
				const nbDays = spanYears > 0 ? spanYears * 365 : 365;

				for (let j = 0; j < nbOrders; j++) {
					//New Bill or existing one
					const bills = await BillsController.getAll();
					const randomBill = rando(true, false);

					let theBill = null;
					if (bills.length > 2 && randomBill) {
						theBill = rando(bills).value;
					} else {
						theBill = await BillsController.add(rando(['per group', 'per person', 'ratios']).value);
					};

					const orderDate = subDays(new Date(), rando(0, nbDays));
					const menu = rando(menusList).value;
					const tone = rando(tonesList).value;
					const feedBack = rando(0, 10);

					const newOrder = await OrdersController.add(newCustomer, theBill, orderDate, menu, tone);

					//feedBack
					if (newOrder) await OrdersController.patchFeedback(newOrder._id.toString(), feedBack);
				}
			}
		}
	}

	//Get counts
	const customers = await Customers.estimatedDocumentCount();
	const orders = await Orders.estimatedDocumentCount();

	return {
		customers,
		orders
	};
}

export default insertion;
