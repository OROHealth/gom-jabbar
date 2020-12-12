import { configuration } from "../../src/config";
import { connect } from '../../src/database';
import insertion from '../../src/services/insertion';
import subDays from 'date-fns/subDays';
import OrdersController from '../../src/controllers/orders';
import compareAsc from 'date-fns/compareAsc';
import addConstantsDatas from '../../src/services/addConstantsDatas';

const config = configuration('Test');

// Connect to the DB Test
beforeAll(async () => {
	await connect(config);
	await addConstantsDatas();
});


describe('Insertion Service', () => {
	it('can add 10 users with 2 orders on a span of 2 years', async () => {
		console.log('START');
		
		const props = {
			nbUsers: 10,
			orderMin: 2,
			orderMax: 2,
			spanYears: 2
		};

		const testMaxDay = new Date();
		const testMinDay = subDays(testMaxDay, props.spanYears * 365);

		const result = await insertion(props);
		
		expect(result.customers).toBe(10);
		expect(result.orders).toBe(20);

		const orderTest = await OrdersController.getAll();
		expect(compareAsc(orderTest[0].orderDate, testMaxDay)).toBeLessThanOrEqual(0);
		expect(compareAsc(orderTest[0].orderDate, testMinDay)).not.toBeGreaterThanOrEqual(0);
	});
});
