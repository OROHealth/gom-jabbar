import { Document, Schema, model, Model } from 'mongoose';

export interface IBills extends Document {
	split: 'per group' | 'per person' | 'ratios';
};

const BillsSchema = new Schema({
	split: String
});

export const Bills = model<IBills, Model<IBills>>("Bills", BillsSchema);
