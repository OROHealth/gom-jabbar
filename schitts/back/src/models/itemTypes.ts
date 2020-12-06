import { Document, Schema, model, Model } from 'mongoose';

export interface IItemTypes extends Document {
	title: string;
};

const ItemTypesSchema = new Schema({
	title: String
});

export const ItemTypes = model<IItemTypes, Model<IItemTypes>>("ItemTypes", ItemTypesSchema);
