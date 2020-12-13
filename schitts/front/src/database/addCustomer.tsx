import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core';

interface IAddCustomerProps {
	setDatas: (value: React.SetStateAction<{
		customers: number;
		orders: number;
	}>) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCustomer: React.FC<IAddCustomerProps> = ({ setDatas, setLoading }) => {

	const [formDatas, setFormDatas] = useState({
		minOrder: 1,
		maxOrder: 1,
		number: 1,
		span: 1
	});

	useEffect(() => {
		if (formDatas.minOrder > formDatas.maxOrder) setFormDatas({ ...formDatas, maxOrder: formDatas.minOrder });
	}, [formDatas]);

	const handleChanges = (target: string, value: unknown) => {
		setFormDatas({ ...formDatas, [target]: value as number });
	};

	const addCustomer = async () => {
		const { minOrder, maxOrder, number, span } = formDatas;

		for (let i = 0; i < number; i++) {
			setTimeout(function () { setLoading(true); }, 1000);

			const addReq = await fetch(`http://localhost:3085/services/insertion?orderMin=${minOrder}&orderMax=${maxOrder}&spanYears=${span}`);
			const datas = await addReq.json();
			if (datas) setDatas(datas);
			setLoading(false);
		}
	}

	return (
		<Grid item xs={12}>
			<Paper elevation={2} style={styles.card}>
				<p style={styles.title}>Add customer:</p>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={8} container
						direction="column"
						justify="center"
						alignItems="center"
						style={styles.container}
					>
						<Grid container
							direction="column"
							justify="space-between"
							alignItems="flex-start"
							spacing={4}
						>
							<Grid item style={styles.block}>
								<TextField id="number" label="Number" variant="outlined" size="small" value={formDatas.number} onChange={(event) => handleChanges('number', event.target.value)} />
							</Grid >
							<Grid item style={styles.block}>
								<FormControl variant="outlined" size="small" style={styles.select}>
									<InputLabel id="minOrderLabel">Minimum orders</InputLabel>
									<Select
										labelId="minOrderLabel"
										id="minOrder"
										value={formDatas.minOrder}
										onChange={(event) => handleChanges('minOrder', event.target.value)}
										label="Minimum orders"
									>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(nb => <MenuItem value={nb} key={nb}>{nb}</MenuItem>)}
									</Select>
								</FormControl>
								<FormControl variant="outlined" size="small" style={styles.select}>
									<InputLabel id="maxOrderLabel">Maximum orders</InputLabel>
									<Select
										labelId="maxOrderLabel"
										id="maxOrder"
										value={formDatas.maxOrder}
										onChange={(event) => handleChanges('maxOrder', event.target.value)}
										label="Maximm orders"
									>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].filter(val => val >= formDatas.minOrder).map(nb => <MenuItem value={nb} key={nb}>{nb}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid >
							<Grid item style={styles.block}>
								<TextField id="span" label="Span of years" variant="outlined" size="small" value={formDatas.span} onChange={(event) => handleChanges('span', event.target.value)} />
							</Grid >
						</Grid >
					</Grid >
					<Grid item xs={4} container
						direction="column"
						justify="center"
						alignItems="center"
						style={styles.container}
					>
						<Button size="medium" variant="contained" color='primary' onClick={addCustomer}>Ajouter</Button>
					</Grid>
				</Grid >
			</Paper>
		</Grid>
	);
};

export default AddCustomer;

const styles = {
	card: {
		width: '100%'
	},
	container: {
		margin: 0,
		width: '100%',
		padding: 15
	},
	title: {
		fontSize: '1.5rem',
		margin: 5,
		textAlign: 'center' as const
	},
	subTitle: {
		fontSize: '1.2rem',
		margin: 5
	},
	block: {
		marginTop: 10,
		padding: 15
	},
	select: {
		width: 140,
		marginRight: 10,
		textAlign: 'center' as const
	}
}