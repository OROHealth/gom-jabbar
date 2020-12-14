import { IBills } from "../models/bills";
import { ICustomers } from "../models/customers";
import { IMenus, Menus } from "../models/menus";
import { Orders, IOrders } from "../models/orders";
import { ITones } from "../models/tones";

const OrdersController = {
	async getAll(): Promise<IOrders[]> {
		const orders = await Orders.find({});
		return orders;
	},

	async count(): Promise<number> {
		const count = await Orders.estimatedDocumentCount();
		return count;
	},

	async findByFeedback(grade: number): Promise<IOrders[]> {
		const orders = Orders.find({
			feedback: { $gte: grade }
		}).populate({
			path: 'menu',
			model: Menus,
			populate: { path: 'food', model: 'MenuItems'}
		}).exec();
		return orders;
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

	async patchFeedback(orderID: string, feedback: number): Promise<IOrders | null> {
		const patchedOrder = await Orders.findByIdAndUpdate(
			orderID,
			{ feedback },
			{ new: true }
		);

		if (patchedOrder) return patchedOrder;
		return null;
	}
}

export default OrdersController;
