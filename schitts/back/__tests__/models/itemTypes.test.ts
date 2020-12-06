import { ItemTypes } from '../../src/models/itemTypes';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('ItemTypes model tests', () => {
	it('can create a new ItemType', async () => {
		await new ItemTypes().save();
		const total = await ItemTypes.countDocuments();
		expect(total).toEqual(1);
	});
});

it('can get a ItemType', async () => {
	const newItemType = await new ItemTypes().save();
	const fetchItemType = await ItemTypes.findById(newItemType._id);
	expect(fetchItemType?._id).toEqual(newItemType._id);
});