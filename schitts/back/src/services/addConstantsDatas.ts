import CustomerTypesController from '../controllers/customerTypes';
import ItemTypesController from '../controllers/itemTypes';
import MenuItemsController from '../controllers/menuItems';
import MenusController from '../controllers/menus';
import TonesController from '../controllers/tones';

const addConstantsDatas = async () => {

	//Add CustomerTypes:
	const types = ['Out of town', 'In town', 'Rose\'s familly'];
	for (let type of types) {
		await CustomerTypesController.add(type);
	};

	//Add ItemTypes:
	const types2 = ['Food', 'Drink'];
	for (let type of types2) {
		await ItemTypesController.add(type);
	};

	//Add Tones:
	const tones = ['angry', 'happy', 'overwhelmed', 'pregnant', 'moody', 'bored', 'excited'];
	for (let tone of tones) {
		await TonesController.add(tone);
	};

	//Add 30 menuItems
	const itemTypes = await ItemTypesController.getAll();

	for (let i = 0; i < 30; i++) {
		const type = itemTypes[Math.floor((Math.random() * itemTypes.length))];
		const title = `item${i}`;
		const price = parseFloat((Math.random() * (20 - 1) + 1).toFixed(2));
		const cookedLevel = Math.floor(Math.random() * 10) + 1;
		const bestBefore = Math.floor(Math.random() * 10) + 1;

		await MenuItemsController.add(type, title, price, cookedLevel, bestBefore);
	};

	//Add 20 menus
	const foodType = await ItemTypesController.findOne('Food');
	const drinkType = await ItemTypesController.findOne('Drink');
	const foodList = await MenuItemsController.getByType(foodType);
	const drinkList = await MenuItemsController.getByType(drinkType);

	for (let j = 0; j < 20; j++) {
		const title = `menu${j}`;
		const food = foodList[Math.floor((Math.random() * foodList.length))];
		const drink = drinkList[Math.floor((Math.random() * drinkList.length))];

		await MenusController.add(title, drink, food);
	};

	return;
}

export default addConstantsDatas;