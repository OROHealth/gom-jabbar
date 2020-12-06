import { CustomerTypes, ICustomerTypes } from "../models/customerTypes";

const CustomerTypesController = {
	async findOne(type: string): Promise<ICustomerTypes | null> {
		const customerType = CustomerTypes.findOne({
			title: type
		});
		return customerType;
	},

	async get(id: string): Promise<ICustomerTypes | null> {
		const customerType = await CustomerTypes.findById(id);
		return customerType;
	},

	async getAll(): Promise<ICustomerTypes[]> {
		const customerTypes = await CustomerTypes.find();
		return customerTypes;
	}
};

export default CustomerTypesController;
