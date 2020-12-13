import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';

interface IResetProps {
	resetDB: () => Promise<void>
}

const Reset: React.FC<IResetProps> = ({ resetDB }) => {
	return (
		<Grid item xs={12}>
			<Paper elevation={2} style={styles.card}>
				<Grid item xs container
					direction="row"
					justify="center"
					alignItems="center"
					style={styles.container}
				>
						<p style={styles.text}>Clear the database:</p>
						<Button size="small" variant="contained" color="secondary" style={styles.button} onClick={resetDB}>Reset</Button>
				</Grid >
			</Paper>
		</Grid>
	);
};

export default Reset;

const styles = {
	card: {
		width: '100%'
	},
	container: {
		padding: 10,
		margin: 0,
		width: '100%'
	},
	text: {
		fontSize: '1.5rem',
		margin: 0
	},
	button: {
		marginLeft: 10
	},
}