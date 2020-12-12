import mongoose from "mongoose";
import addConstantsDatas from './addConstantsDatas';

//TO REMOVE ALL COLLECTIONS
async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			// This error happens when you try to drop a collection that's already dropped. Happens infrequently.
			// Safe to ignore.
			if (error.message === "ns not found") return;

			// This error happens when you use it.todo.
			// Safe to ignore.
			if (error.message.includes("a background operation is currently running"))
				return;

			console.log(error.message);
		}
	}
}

const resetDB = async ():Promise<boolean> => {
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

export default resetDB;
