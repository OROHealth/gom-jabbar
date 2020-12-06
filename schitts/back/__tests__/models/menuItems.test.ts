import { MenuItems } from '../../src/models/menuItems';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('MenuItems model tests', () => {
	it('can create a new MenuItem', async () => {
		await new MenuItems().save();
		const total = await MenuItems.countDocuments();
		expect(total).toEqual(1);
	});

	it('can create a new MenuItem with defaults values', async () => {
		const newMenuItem = await new MenuItems().save();
		expect(newMenuItem?.price).toBe(0);
		expect(newMenuItem?.cookedLevel).toBe(null);
	});

	it('can get a MenuItem', async () => {
		const newMenuItem = await new MenuItems().save();
		const fetchMenuItem = await MenuItems.findById(newMenuItem._id);
		expect(fetchMenuItem?._id).toEqual(newMenuItem._id);
	});

	it('can update a MenuItem', async () => {
		const newMenuItem = await new MenuItems().save();
		const newDate = new Date();

		const upMenuItem = await MenuItems.findByIdAndUpdate(
			{ _id: newMenuItem._id },
			{ lastMade: newDate },
			{ new: true }
		);
		expect(upMenuItem?.lastMade).toEqual(newDate);
	});

	it('can delete a MenuItem', async () => {
		const newMenuItem = await new MenuItems().save();
		await MenuItems.findByIdAndDelete(newMenuItem._id);
		const total = await MenuItems.countDocuments();
		expect(total).toEqual(0);
	});
});