import React from 'react';
import { Grid } from '@material-ui/core';

// Icons
import soon from '../img/under-construction.png';

const Index: React.FC<{}> = () => {
	return (
		<Grid container
			direction="column"
			justify="center"
			alignItems="center"
		>
			<Grid item xs={8} container
				direction="column"
				justify="center"
				alignItems="center"
				style={styles.container}
				spacing={4}
			>
				<img src={soon} alt="Icon" style={styles.icon} />
				<h3>Soon !</h3>
			</Grid >
		</Grid >
	);
};

export default Index;

const styles = {
	container: {
		marginTop: 50,
		padding: 10,
		height: '100%'
	},
	icon: {
		height: 150,
		width: 150,
	},
}