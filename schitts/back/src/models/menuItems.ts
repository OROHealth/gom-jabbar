import { Document, Schema, model, Model } from 'mongoose';
import { IItemTypes } from './itemTypes';

export interface IMenuItems extends Document {
	type: IItemTypes;
	title: string;
	price: number;
	cookedLevel: number | null;
	lastMade: Date;
	bestBefore: number;
};

const MenuItemsSchema = new Schema({
	type: {
		type: Schema.Types.ObjectId,
		ref: 'ItemTypes'
	},
	title: String,
	price: { type: Number, default: 0 },
	cookedLevel: { type: Number, default: null },
	lastMade: Date,
	bestBefore: Number
});

export const MenuItems = model<IMenuItems, Model<IMenuItems>>("MenuItems", MenuItemsSchema);
