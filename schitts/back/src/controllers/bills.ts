import { Bills, IBills } from "../models/bills";

const BillsController = {
	async get(id: string): Promise<IBills | null> {
		const bill = await Bills.findById(id);
		return bill;
	},

	async getAll(): Promise<IBills[]> {
		const bills = await Bills.find({});
		return bills;
	},

	async add(split: string): Promise<IBills> {
		const bill = await new Bills({
			split
		}).save();
		return bill;
	}
};

export default BillsController;
