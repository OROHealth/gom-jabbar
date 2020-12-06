import { setupDB } from '../../src/testSetup';
import { MenuItems } from '../../src/models/menuItems';
import MenuItemsController from '../../src/controllers/menuItems';

//SetUp DB
setupDB();

describe('MenuItems Controllers', () => {
	it('can get MenuItem by id', async () => {
		const menuItemTest = await new MenuItems().save();
		const menuItem = await MenuItemsController.get(menuItemTest._id);
		expect(menuItem?._id).toEqual(menuItemTest._id);
	});

	it('can add MenuItem', async () => {
		const menuItem = await MenuItemsController.add();
		expect(menuItem?._id).toBeTruthy();
	});

	it('can update MenuItem', async () => {
		const menuItemTest = await new MenuItems({
			title: 'Toto',
		}).save();

		const menuItem = await MenuItemsController.patch(menuItemTest._id, { title: 'tata' });
		expect(menuItem?.title).not.toBe(menuItemTest.title);
	});
});
