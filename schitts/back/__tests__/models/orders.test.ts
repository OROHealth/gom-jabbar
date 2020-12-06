import { Orders } from '../../src/models/orders';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('Orders model tests', () => {
	it('can create a new Order', async () => {
		await new Orders().save();
		const total = await Orders.countDocuments();
		expect(total).toEqual(1);
	});

	it('can get a Order', async () => {
		const newOrder = await new Orders().save();
		const fetchOrder = await Orders.findById(newOrder._id);
		expect(fetchOrder?._id).toEqual(newOrder._id);
	});

	it('can update a Order', async () => {
		const newOrder = await new Orders().save();
		const testDate = new Date();

		const upOrder = await Orders.findByIdAndUpdate(
			{ _id: newOrder._id },
			{ orderDate: testDate },
			{ new: true }
		);
		expect(upOrder?.orderDate).toEqual(testDate);
	});

	it('can delete a Order', async () => {
		const newOrder = await new Orders().save();
		await Orders.findByIdAndDelete(newOrder._id);
		const total = await Orders.countDocuments();
		expect(total).toEqual(0);
	});
});