import { Customers } from '../../src/models/customers';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('Customers model tests', () => {
	it('can create a new Customer', async () => {
		await new Customers().save();
		const total = await Customers.countDocuments();
		expect(total).toEqual(1);
	});

	it('can get a Customer', async () => {
		const newCustomer = await new Customers().save();
		const fetchCustomer = await Customers.findById(newCustomer._id);
		expect(fetchCustomer?._id).toEqual(newCustomer._id);
	});

	it('can update a Customer', async () => {
		const newCustomer = await new Customers().save();
		const testFisrtName = 'Toto';

		const upCustomer = await Customers.findByIdAndUpdate(
			{ _id: newCustomer._id },
			{ firstName: testFisrtName },
			{ new: true }
		);
		expect(upCustomer?.firstName).toBe(testFisrtName);
	});

	it('can delete a Customer', async () => {
		const newCustomer = await new Customers().save();
		await Customers.findByIdAndDelete(newCustomer._id);
		const total = await Customers.countDocuments();
		expect(total).toEqual(0);
	});
});