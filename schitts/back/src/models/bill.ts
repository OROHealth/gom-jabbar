import { Document, Schema, model, Model } from 'mongoose';

export interface IBill extends Document {
	split: 'per group' | 'per person' | 'ratios';
};

const BillSchema = new Schema({
	split: String
});

export const Bill = model<IBill, Model<IBill>>("Bill", BillSchema);
