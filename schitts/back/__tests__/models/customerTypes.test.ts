import { CustomerTypes } from '../../src/models/customerTypes';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('CustomerTypes model tests', () => {
	it('can create a new customerType', async () => {
		await new CustomerTypes().save();
		const total = await CustomerTypes.countDocuments();
		expect(total).toEqual(1);
	});
});

it('can get a customerType', async () => {
	const newCustomerType = await new CustomerTypes().save();
	const fetchCustomerType = await CustomerTypes.findById(newCustomerType._id);
	expect(fetchCustomerType?._id).toEqual(newCustomerType._id);
});