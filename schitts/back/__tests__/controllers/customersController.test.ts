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

	it('can get all Customers', async () => {
		await new Customers().save();
		const customers = await CustomersController.getAll();
		expect(customers.length).toBe(1);
	});

	it('can find a Customer by firstName', async () => {
		await new Customers({
			firstName: 'Toto',
		}).save();
		await new Customers({
			firstName: 'tutu',
		}).save();

		const customers = await CustomersController.findBy({ firstName: 'Toto' });
		expect(customers.length).toBe(1);
	});
});
