import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import Count from './count';

interface IDatabaseProps { }

const Index: React.FC<IDatabaseProps> = () => {

	const [datas, setDatas] = useState({ customers: 0, orders: 0 });

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

	const reset = async () => {
		await fetch(`http://localhost:3085/services/reset`);
		await getCounts();
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
			>
				<Count title="Customers" value={datas.customers} />
				<Count title="Orders" value={datas.orders} />
			</Grid >
			<Grid item xs={6} container
				direction="row"
				justify="flex-start"
				alignItems="center"
				style={styles.container}
			>
				<p style={styles.text}>Clear the database:</p>
				<Button size="small" variant="contained" color="secondary" style={styles.button} onClick={reset}>Reset</Button>
			</Grid >
		</Grid >
	);
};

export default Index;

const styles = {
	container: {
		marginTop: 10,
		padding: 5,
		paddingLeft: 15,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 10,
		borderColor: 'black',
	},
	text: {
		fontSize: '1.5rem',
		margin: 5
	},
	button: {
		marginLeft: 10
	},
}
