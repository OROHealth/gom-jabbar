import React from 'react';
import { Grid, Paper } from '@material-ui/core';

interface IMenuCardProps {
	part: { [key: string]: any };
	selected: boolean;
	action: () => void;
}

const MenuCard: React.FC<IMenuCardProps> = ({ part, selected, action }) => {
	return (
		<>
			<Grid item >
				<Paper elevation={2} style={styles.paper} onClick={action}>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						style={styles.container}
					>
						<p style={styles.title}>{part.title}</p>
					</Grid >
				</Paper>
				{selected ?
					<div style={styles.selectedBar}></div>
					: null}
			</Grid >
		</>
	);
};

export default MenuCard;

const styles = {
	paper: {
		cursor: 'pointer' as const
	},
	container: {
		height: 150,
		width: 150,
	},
	title: {
		fontSize: '1.2rem',
	},
	selectedBar: {
		height: 5,
		width: 150,
		backgroundColor: '#3DB9E9',
		marginTop: 5,
		borderRadius: 10
	}
};
