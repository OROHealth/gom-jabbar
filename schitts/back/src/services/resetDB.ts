import { dropAllCollections } from '../testSetup';
import addConstantsDatas from './addConstantsDatas';

const resetDB = async () => {
	try {
		//Drop collections
		await dropAllCollections();

		//Add constants datas
		await addConstantsDatas();

		return true;

	} catch (_error) {
		return false
	}

}