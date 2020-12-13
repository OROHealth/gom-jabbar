import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
//Components
import Count from './count';
import Reset from './reset';
import AddCustomer from './addCustomer';
// Icons
import customer from '../img/customer.png';
import order from '../img/order.png';

interface IDatabaseProps { }

const Index: React.FC<IDatabaseProps> = () => {

	const [datas, setDatas] = useState({ customers: 0, orders: 0 });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCounts();
	}, []);

	const getCounts = async () => {
		const customersReq = await fetch(`http://localhost:3085/customers/count`);
		const customers = await customersReq.text();
		const ordersReq = await fetch(`http://localhost:3085/orders/count`);
		const orders = await ordersReq.text();

		Promise.all([customers, orders]).then((values) => {
			setDatas({
				customers: parseInt(values[0]) ?? 0,
				orders: parseInt(values[1]) ?? 0
			})
		})
	};

	const resetDB = async () => {
		setLoading(true);
		await fetch(`http://localhost:3085/services/reset`);
		await getCounts();
		setLoading(false);
	};

	return (
		<Grid container
			direction="column"
			justify="center"
			alignItems="center"
		>
			<Grid item xs={6} container
				direction="row"
				justify="center"
				alignItems="center"
				spacing={4}
			>
				<Count title="Customers" value={datas.customers} icon={customer} loading={loading} />
				<Count title="Orders" value={datas.orders} icon={order} loading={loading} />
			</Grid >
			<Grid item xs={5} container
				direction="row"
				justify="center"
				alignItems="center"
				style={styles.block}
			>
				<Reset resetDB={resetDB} />
			</Grid >
			<Grid item xs={5} container
				direction="row"
				justify="center"
				alignItems="center"
				style={styles.block}
			>
				<AddCustomer setDatas={setDatas} setLoading={setLoading} />
			</Grid >
		</Grid >
	);
};

export default Index;

const styles = {
	block: {
		marginTop: 10,
		marginBottom: 10,
	}
}
