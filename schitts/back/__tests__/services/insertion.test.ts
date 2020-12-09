import { setupDB } from '../../src/testSetup';
import { Customers } from '../../src/models/customers';
import CustomersController from '../../src/controllers/customers';

//SetUp DB
setupDB();

describe('Insertion Service', () => {
	it('can add 10 users with 2 orders on a span of 2 years', async () => {
		const props = {
			nbUsers: 10,
			orderMin: 2,
			orderMax: 2,
			spanYears: 2
		};

		
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
