import React, { useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import MenuCard from './components/menuCard';

//Parts
import Database from './database/index';
import Overcooked from './overcooked/index';

// Icons
import database from './img/database.png';
import statistics from './img/statistics.png';
import pot from './img/pot.png';

function App() {

	const parts = [
		{
			title: 'Database',
			icon: database,
			component: <Database />
		},
		{
			title: 'Statistics',
			icon: statistics,
			component: null
		},
		{
			title: 'Overcooked ?',
			icon: pot,
			component: <Overcooked />
		}
	];

	const [selectedPart, setSelectedPart] = useState(0);

	return (
		<div className="App">
			<Grid container
				direction="column"
				justify="center"
				alignItems="center"
			>
				{/* MENU */}
				<Grid item xs={12} container
					direction="row"
					justify="center"
					alignItems="flex-start"
					spacing={3}
					style={styles.menu}
				>
					{parts.map((part, index) => {
						return <MenuCard part={part} selected={index === selectedPart} key={index} action={() => setSelectedPart(index)} />
					}
					)}
				</Grid >
				{/* PART */}
				<Grid item xs={12} style={styles.part}>
					{parts[selectedPart].component}
				</Grid >
			</Grid >
		</div>
	);
}

export default App;

const styles = {
	menu: {
		padding: 10,
		marginTop: 30
	},
	part: {
		width: '100%'
	}
}
