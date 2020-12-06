import { Document, Schema, model, Model } from 'mongoose';

export interface ICustomerTypes extends Document {
	title: string;
};

const CustomerTypesSchema = new Schema({
	title: String
});

export const CustomerTypes = model<ICustomerTypes, Model<ICustomerTypes>>("CustomerTypes", CustomerTypesSchema);
