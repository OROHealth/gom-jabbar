import { Document, Schema, model, Model } from 'mongoose';
import { IBills } from './bills';
import { ICustomers } from './customers';
import { IMenus } from './menus';
import { ITones } from './tones';

export interface IOrders extends Document {
	customer: ICustomers;
	bill: IBills;
	orderDate: Date;
	menu: IMenus;
	tone: ITones;
	feedback: number | null;
};

const OrdersSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'Customers'
	},
	bill: {
		type: Schema.Types.ObjectId,
		ref: 'Bills'
	},
	orderDate: Date,
	menu: {
		type: Schema.Types.ObjectId,
		ref: 'Menus'
	},
	tone: {
		type: Schema.Types.ObjectId,
		ref: 'Tones'
	},
	feedback: { type: Number, default: null }
});

export const Orders = model<IOrders, Model<IOrders>>("Orders", OrdersSchema);
