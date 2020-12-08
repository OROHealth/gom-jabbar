import { Bills, IBills } from "../models/bills";

const BillsController = {
	async get(id: string): Promise<IBills | null> {
		const bill = await Bills.findById(id);
		return bill;
	},

	async getAll(): Promise<IBills[]> {
		const bills = await Bills.find();
		return bills;
	}
};

export default BillsController;
