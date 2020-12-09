import { Menus, IMenus } from "../models/menus";

const MenusController = {
	async get(id: string): Promise<IMenus | null> {
		const menu = await Menus.findById(id);
		return menu;
	},

	async getAll(): Promise<IMenus[]> {
		const menus = await Menus.find();
		return menus;
	}
};

export default MenusController;
