import React from 'react';
import { Grid } from '@material-ui/core';

interface ICountProps {
	title: string;
	value: number;
}

const Count: React.FC<ICountProps> = ({ title, value }) => {
	return (
		<Grid item xs={5} container
			direction="column"
			justify="center"
			alignItems="center"
			style={styles.container}
		>
			<p style={styles.title}>{`${title}: ${value}`}</p>
		</Grid >
	);
};

export default Count;

const styles = {
	container: {
		margin: 10,
		padding: 5,
		marginTop: 30,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 10,
		borderColor: 'black',
	},
	title: {
		fontSize: '1.5rem'
	},
}