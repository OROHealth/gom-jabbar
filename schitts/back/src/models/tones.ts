import { Document, Schema, model, Model } from 'mongoose';

export interface ITones extends Document {
	title: string;
};

const TonesSchema = new Schema({
	title: String
});

export const Tones = model<ITones, Model<ITones>>("Tones", TonesSchema);
