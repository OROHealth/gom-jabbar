import { IBills } from "../models/bills";
import { ICustomers } from "../models/customers";
import { IMenus } from "../models/menus";
import { Orders, IOrders } from "../models/orders";
import { ITones } from "../models/tones";

const OrdersController = {
	async get(orderID: string): Promise<IOrders | null> {
		const order = await Orders.findById(orderID);
		return order;
	},

	async add(customer: ICustomers, bill: IBills, orderDate: Date, menu: IMenus, tone: ITones): Promise<IOrders | null> {
		const newOrder = new Orders({
			customer,
			bill,
			orderDate,
			menu,
			tone
		});
		const orderSaved = await newOrder.save({});
		if (orderSaved) return orderSaved;
		return null;
	},

	async patchFeedback(orderID: string, feedBack: number): Promise<IOrders | null> {
		const patchedOrder = await Orders.findByIdAndUpdate(
			orderID,
			{feedBack},
			{ new: true }
		);
		if (patchedOrder) return patchedOrder;
		return null;
	}
}

export default OrdersController;
