import { IMenuItems } from "../models/menuItems";
import { Menus, IMenus } from "../models/menus";

const MenusController = {
	async get(id: string): Promise<IMenus | null> {
		const menu = await Menus.findById(id);
		return menu;
	},

	async getAll(): Promise<IMenus[]> {
		const menus = await Menus.find();
		return menus;
	},

	async add(title: string, drink: IMenuItems, food: IMenuItems): Promise<IMenus | null> {
		const newMenuItem = new Menus({
			title,
			drink,
			food
		});
		const menuSaved = await newMenuItem.save();
		if (menuSaved) return menuSaved;
		return null;
	},
};

export default MenusController;
