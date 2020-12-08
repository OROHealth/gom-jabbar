import { Customers, ICustomers } from "../models/customers";

const CustomersController = {
	async findBy(body: {[key: string]: any}): Promise<ICustomers[]> {
		const customers = Customers.find(body);
		return customers;
	},

	async get(id: string): Promise<ICustomers | null> {
		const customerType = await Customers.findById(id);
		return customerType;
	},

	async getAll(): Promise<ICustomers[]> {
		const customers = await Customers.find();
		return customers;
	}
};

export default CustomersController;
