import { Customers, ICustomers } from "../models/customers";
import { ICustomerTypes } from "../models/customerTypes";
import { IMenuItems } from "../models/menuItems";

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
		const customers = await Customers.find({});
		return customers;
	},

	async count(): Promise<number> {
		const count = await Customers.estimatedDocumentCount();
		return count;
	},

	async add(firstName: string, type: ICustomerTypes, drinkPreferences: IMenuItems[], foodPreferences: IMenuItems[]): Promise<ICustomers | null> {
		const newCustomer = new Customers({
			firstName,
			type,
			drinkPreferences,
			foodPreferences
		});
		const newCustomerSaved = await newCustomer.save();
		if (newCustomerSaved) return newCustomerSaved;
		return null;
	},
};

export default CustomersController;
