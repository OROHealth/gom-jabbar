import { setupDB } from '../../src/testSetup';
import { Customers } from '../../src/models/customers';
import CustomersController from '../../src/controllers/customers';

//SetUp DB
setupDB();

describe('Customers Controllers', () => {
	it('can get Customer by id', async () => {
		const customerTest = await new Customers().save();
		const customer = await CustomersController.get(customerTest._id);
		expect(customer?._id).toEqual(customerTest._id);
	});

	it('can add Customer', async () => {
		const customer = await CustomersController.add();
		expect(customer?._id).toBeTruthy();
	});

	it('can update Customer', async () => {
		const customerTest = await new Customers({
			firstName: 'Toto',
		}).save();

		const customer = await CustomersController.patch(customerTest._id, { firstName: 'tata' });
		expect(customer?.firstName).not.toBe(customerTest.firstName);
	});
});
