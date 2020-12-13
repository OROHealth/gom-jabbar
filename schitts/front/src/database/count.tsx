import React from 'react';
import { Grid, Paper, CircularProgress } from '@material-ui/core';

interface ICountProps {
	title: string;
	value: number;
	icon: string;
	loading: boolean;
}

const Count: React.FC<ICountProps> = ({ title, value, icon, loading }) => {
	return (
		<Grid item>
			<Paper elevation={1} style={styles.card}>
				<Grid container
					direction="column"
					justify="space-evenly"
					alignItems="center"
					style={styles.container}
				>
					<Grid item>
						<img src={icon} alt="Icon" style={styles.icon} />
					</Grid >
					<Grid item>
						<p style={styles.title}>{title}</p>
					</Grid >
					<Grid item>
						{loading ?
							<CircularProgress size={20} />
							: <p style={styles.count}>{value}</p>
						}
					</Grid >
				</Grid >
			</Paper>
		</Grid>
	);
};

export default Count;

const styles = {
	card: {
		width: 200,
		height: 200
	},
	container: {
		padding: 10,
		height: '100%'
	},
	title: {
		fontSize: '1.5rem',
		margin: 0
	},
	count: {
		fontSize: '2rem',
		fontWeight: 'bold' as const,
		margin: 0
	},
	icon: {
		height: 50,
		width: 50,
	},
}