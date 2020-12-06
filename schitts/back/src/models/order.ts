import { Document, Schema, model, Model } from 'mongoose';
import { IMenuItems } from './menuItems';

export interface IOrders extends Document {
	// customer: ICustomers
	title: string;
	drink: IMenuItems | null;
	food: IMenuItems | null;
};

const OrdersSchema = new Schema({
	title: String,
	drink: {
		type: Schema.Types.ObjectId,
		ref: 'IMenuItems'
	},
	food: {
		type: Schema.Types.ObjectId,
		ref: 'IMenuItems'
	}
});

export const Orders = model<IOrders, Model<IOrders>>("Orders", OrdersSchema);
