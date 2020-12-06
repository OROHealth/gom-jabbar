import { Document, Schema, model, Model } from 'mongoose';
import { ICustomerTypes } from './customerTypes';
import { IMenuItems } from './menuItems';

export interface ICustomers extends Document {
	firstName: string;
	type: ICustomerTypes;
	drinkPreferences: IMenuItems[];
	foodPreferences: IMenuItems[];
};

const CustomersSchema = new Schema({
	firstName: String,
	type: {
		type: Schema.Types.ObjectId,
		ref: 'CustomerTypes'
	},
	drinkPreferences: [{
		type: Schema.Types.ObjectId,
		ref: 'MenuItems'
	}],
	foodPreferences: [{
		type: Schema.Types.ObjectId,
		ref: 'MenuItems'
	}]
});

export const Customers = model<ICustomers, Model<ICustomers>>("Customers", CustomersSchema);
