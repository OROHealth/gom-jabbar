import React, { useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import MenuCard from './components/menuCard';

function App() {

	const parts = [
		{
			title: 'Statistiques',
			icon: null,
			component: null
		},
		{
			title: 'Trop cuit !?',
			icon: null,
			component: null
		}
	];

	const [selectedPart, setSelectedPart] = useState(0)

	return (
		<div className="App">
			<Grid container
				direction="column"
				justify="center"
				alignItems="center"
			>
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
