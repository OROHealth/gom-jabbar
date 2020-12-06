import { Document, Schema, model, Model } from 'mongoose';
import { IMenuItems } from './menuItems';

export interface IMenus extends Document {
	title: string;
	drink: IMenuItems | null;
	food: IMenuItems | null;
};

const MenusSchema = new Schema({
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

export const Menus = model<IMenus, Model<IMenus>>("Menus", MenusSchema);
