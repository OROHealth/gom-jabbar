import { Tones, ITones } from "../models/tones";

const TonesController = {
	async findOne(type: string): Promise<ITones | null> {
		const tone = Tones.findOne({
			title: type
		});
		return tone;
	},

	async get(id: string): Promise<ITones | null> {
		const tone = await Tones.findById(id);
		return tone;
	},

	async getAll(): Promise<ITones[]> {
		const tones = await Tones.find({});
		return tones;
	},

	async add(title: string): Promise<ITones> {
		const tone = new Tones({
			title
		}).save();
		return tone;
	}
};

export default TonesController;
