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

	const [datas, setDatas] = useState({ diners: 0, money: 0, median: 0 });
	const [loading, setLoading] = useState(false);

	const fetchDatas = async (values: { grade: number; months: number; }) => {
		setLoading(true);
		const req = await fetch(`http://localhost:3085/orders/feedback?grade=${values.grade}&months=${values.months}`);
		const list = await req.json();
		const newDatas = await sumList(list);
		setDatas(newDatas);
		setLoading(false);
	};

	const sumList = async (list: Array<{ [key: string]: any }>) => {

		let moneySum = 0;
		const gradesList: number[] = [];

		for (let order of list) {
			moneySum += order.menu?.food?.price ?? 0;
			gradesList.push(order.feedback);
		}

		return {
			diners: list.length,
			money: moneySum,
			median: getMedian(gradesList)
		};
	}

	const getMedian = (listGrades: number[]) => {
		const mid = Math.floor(listGrades.length / 2),
			nums = [...listGrades].sort((a, b) => a - b);
		return listGrades.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
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
				<Result title="Money" value={`${datas.money.toFixed(2)} $`} icon={money} loading={loading} />
				<Result title="Median rate" value={datas.median} icon={median} loading={loading} />
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