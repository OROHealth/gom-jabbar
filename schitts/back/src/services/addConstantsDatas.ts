import CustomerTypesController from '../controllers/customerTypes';
import ItemTypesController from '../controllers/itemTypes';
import TonesController from '../controllers/tones';

const addConstantsDatas = async () => {

	//Add CustomerTypes:
	['Out of town', 'In town', 'Rose\'s familly'].forEach(async item => {
		await CustomerTypesController.add(item);
	});

	//Add ItemTypes:
	['Food', 'Drink'].forEach(async item => {
		await ItemTypesController.add(item);
	});

	//Add Tones:
	['angry', 'happy', 'overwhelmed', 'pregnant', 'moody', 'bored', 'excited'].forEach(async item => {
		await TonesController.add(item);
	});
}

export default addConstantsDatas;