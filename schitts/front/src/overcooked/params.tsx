import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Slider, Button } from '@material-ui/core';

interface IParamsProps {
	fetchDatas: (values: {
		grade: number;
		months: number;
	}) => Promise<void>
}

const Params: React.FC<IParamsProps> = ({ fetchDatas }) => {
	const [formDatas, setFormDatas] = useState({
		grade: 5,
		months: 6
	});

	const handleChanges = (target: string, value: unknown) => {
		setFormDatas({ ...formDatas, [target]: value as number });
	};

	return (
		<Grid item xs={4} container
			direction="row"
			justify="center"
			alignItems="center"
			style={styles.container}
		>
			<Paper elevation={2} style={styles.card}>
				<p style={styles.title}>Parameters:</p>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={9} container
						direction="column"
						justify="space-between"
						alignItems="flex-start"
						spacing={3}
					>
						<Grid item style={styles.block}>
							<Typography id="gradeLabel" gutterBottom>Rate</Typography>
							<Slider
								defaultValue={5}
								aria-labelledby="gradeLabel"
								step={1}
								marks
								min={1}
								max={10}
								valueLabelDisplay="on"
								style={styles.slider}
								onChange={(_event, value) => handleChanges('grade', value)}
							/>
						</Grid>
						<Grid item style={styles.block}>
							<TextField id="number" label="Number" variant="outlined" size="small" value={formDatas.months} onChange={(event) => handleChanges('months', event.target.value)} />
						</Grid >
					</Grid >
					<Grid item xs={3} container
						direction="column"
						justify="center"
						alignItems="flex-start"
					>
						<Button size="medium" variant="contained" color='primary' onClick={() => fetchDatas(formDatas)}>Check</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Params;

const styles = {
	block: {
		marginTop: 10,
		marginBottom: 10,
	},
	card: {
		width: '100%',
		padding: 5
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
	slider: {
		width: 200
	}
}