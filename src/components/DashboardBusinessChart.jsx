import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import languages from '../data/language.json';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const DashboardBusinessChart = ({ chartState,handleState, getLast12Months,getLast31Days }) => {
	const { language: lang } = useContext(AuthContext);
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);
	const options = {
		responsive: true,
		scales: {
			y1: {
				type: 'linear',
				position: 'left',
				ticks: {
					callback: function (value, index, values) {
						return `$${value}`;
					},
				},
			},
			y2: {
				type: 'linear',
				position: 'right',
			},
		},
	};

    const data = {
		labels: chartState.labels,
		datasets: [
			{
				label: 'Sales',
				data: chartState.chartData.reversedSales,
				borderColor: 'rgb(220,53,69)',
				backgroundColor: 'rgba(220,53,69, 0.5)',
				yAxisID: 'y1',
				tension: 0.4,
			},
			{
				label: 'Orders',
				data: chartState.chartData.reversedOrders,
				borderColor: 'rgb(25,135,84)',
				backgroundColor: 'rgba(25,135,84, 0.5)',
				yAxisID: 'y2',
				tension: 0.4,
			},
		],
	};

	return (
		<div className='col-11 col-md-7 my-3'>
			{' '}
			<div className='ms-4 h4 text-light text-start'>Sales - Orders</div>
			<div className='d-flex col-12 justify-content-center h6'>
				<div
					style={{ cursor: 'pointer', color: 'white' }}
					className={`col-6 py-1 ${
						chartState.period === 'months' && 'sidebar-active bg-dark'
					}`}
					onClick={() => {
						handleState('months',getLast31Days)
					}}
				>
					{languages[0][lang].dashboard.months}
				</div>
				<div
					style={{ cursor: 'pointer', color: 'white' }}
					className={`col-6 py-1 ${
						chartState.period === 'year' && 'sidebar-active bg-dark'
					}`}
					onClick={() => {
						
						handleState('year',getLast12Months)
					}}
				>
					{languages[0][lang].dashboard.year}
				</div>
			</div>
			<Line options={options} data={data} />
		</div>
	);
};

export default DashboardBusinessChart;
