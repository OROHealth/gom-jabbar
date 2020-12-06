import { Menus } from '../../src/models/menus';
import { setupDB } from '../../src/testSetup';

//SetUp DB
setupDB();

describe('Menus model tests', () => {
	it('can create a new Menu', async () => {
		await new Menus().save();
		const total = await Menus.countDocuments();
		expect(total).toEqual(1);
	});

	it('can get a Menu', async () => {
		const newMenu = await new Menus().save();
		const fetchMenu = await Menus.findById(newMenu._id);
		expect(fetchMenu?._id).toEqual(newMenu._id);
	});

	it('can update a Menu', async () => {
		const newMenu = await new Menus().save();
		const testTitle = 'Toto';

		const upMenu = await Menus.findByIdAndUpdate(
			{ _id: newMenu._id },
			{ title: testTitle },
			{ new: true }
		);
		expect(upMenu?.title).toBe(testTitle);
	});

	it('can delete a Menu', async () => {
		const newMenu = await new Menus().save();
		await Menus.findByIdAndDelete(newMenu._id);
		const total = await Menus.countDocuments();
		expect(total).toEqual(0);
	});
});