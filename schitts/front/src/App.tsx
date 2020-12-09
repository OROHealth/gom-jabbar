import React, { useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import MenuCard from './components/menuCard';

//Parts
import Database from './database/index';

// Icons
import database from './img/database.png';
import statistics from './img/statistics.png';
import pot from './img/pot.png';

function App() {

	const parts = [
		{
			title: 'Base de donnée',
			icon: database,
			component: <Database />
		},
		{
			title: 'Statistiques',
			icon: statistics,
			component: null
		},
		{
			title: 'Trop cuit !?',
			icon: pot,
			component: null
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
					style={styles.container}
				>
					{parts.map((part, index) => {
						return <MenuCard part={part} selected={index === selectedPart} key={index} action={() => setSelectedPart(index)} />
					}
					)}
				</Grid >
				{/* PART */}
				<Grid item>
					{parts[selectedPart].component}
				</Grid >
			</Grid >
		</div>
	);
}

export default App;

const styles = {
	container: {
		padding: 10,
		marginTop: 30
	},
	// listItem: {
	// 	paddingLeft: '0px',
	// 	paddingRight: '0px'
	// },
	// title: {
	// 	fontSize: '1.2rem',
	// 	textAlign: 'center' as const
	// }
}
