import { ItemTypes, IItemTypes } from "../models/itemTypes";

const ItemTypesController = {
	async findOne(type: string): Promise<IItemTypes | null> {
		const itemType = ItemTypes.findOne({
			title: type
		});
		return itemType;
	},

	async get(id: string): Promise<IItemTypes | null> {
		const itemType = await ItemTypes.findById(id);
		return itemType;
	},

	async getAll(): Promise<IItemTypes[]> {
		const itemTypes = await ItemTypes.find();
		return itemTypes;
	}
};

export default ItemTypesController;
