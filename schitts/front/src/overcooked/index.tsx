import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

//Components
import Params from './params';
import Result from './result';

// Icons
import dinner from '../img/romantic-dinner.png';
import money from '../img/money-bag.png';
import median from '../img/increasing-bar-graph.png';

const Index: React.FC<{}> = () => {

	const [datas, setDatas] = useState({ diners: 0, money: 0, median: 0.0});
	const [loading, setLoading] = useState(false);

	const fetchDatas = async (values: { rate: number; months: number; }) => {
		console.log(values);
	}

	return (
		<Grid container
			direction="column"
			justify="center"
			alignItems="center"
		>
			<Params fetchDatas={fetchDatas} />
			<Grid item xs={8} container
				direction="row"
				justify="center"
				alignItems="center"
				style={styles.container}
				spacing={4}
			>
				<Result title="Diners" value={datas.diners} icon={dinner} loading={loading} />
				<Result title="Money" value={`${datas.money} $`} icon={money} loading={loading} />
				<Result title="Median rate" value={Math.round(datas.median).toFixed(1)} icon={median} loading={loading} />
			</Grid >
		</Grid >
	);
};

export default Index;

const styles = {
	container: {
		padding: 10,
		height: '100%'
	}
}