import { MenuItems, IMenuItems } from "../models/menuItems";

const MenuItemsController = {
	async get(menuItemID: string): Promise<IMenuItems | null> {
		const menuItem = await MenuItems.findById(menuItemID);
		return menuItem;
	},

	async add(): Promise<IMenuItems | null> {
		const newMenuItem = new MenuItems();
		const menuItemSaved = await newMenuItem.save();
		if (menuItemSaved) return menuItemSaved;
		return null;
	},

	async patch(menuItemID: string, body: Object): Promise<IMenuItems | null> {
		const patchedMenuItem = await MenuItems.findByIdAndUpdate(
			menuItemID,
			body,
			{ new: true }
		);
		if (patchedMenuItem) return patchedMenuItem;
		return null;
	}
}

export default MenuItemsController;