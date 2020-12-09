
import supertest from 'supertest';
import mongoose from "mongoose";
import createExpressApp from "./server";
import { configuration } from "./config";
import { connect } from './database';

const config = configuration('Test');
const app = createExpressApp(config);

//TO CREATE REQUEST
export const request = supertest(app);

//TO CLEAR ALL COLLECTIONS
async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany({});
	}
}

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

//ALL STEPS
export const setupDB = async () => {
	// Connect to the DB Test
	beforeAll(async () => {
		await connect(config);
	});

	// Cleans up database between each test
	afterEach(async () => {
		await removeAllCollections();
	});

	// Disconnect Mongoose
	afterAll(async () => {
		await dropAllCollections();
		await mongoose.connection.close();
	});
}
