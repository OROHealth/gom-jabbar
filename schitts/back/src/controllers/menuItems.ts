import { IItemTypes } from "../models/itemTypes";
import { MenuItems, IMenuItems } from "../models/menuItems";

const MenuItemsController = {
	async get(menuItemID: string): Promise<IMenuItems | null> {
		const menuItem = await MenuItems.findById(menuItemID);
		return menuItem;
	},

	async getAll(): Promise<IMenuItems[]> {
		const menuItems = await MenuItems.find();
		return menuItems;
	},

	async getByType(type: IItemTypes | null): Promise<IMenuItems[]> {
		const menuItems = type ? await MenuItems.find({
			type
		}) : [];
		return menuItems;
	},

	async add(type: IItemTypes, title: string, price: number, cookedLevel: number, bestBefore: number): Promise<IMenuItems | null> {
		const newMenuItem = new MenuItems({
			type,
			title,
			price,
			cookedLevel,
			bestBefore
		});
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