import React from 'react';
import DashboardBusinessIconsCard from './DashboardBusinessIconsCard';
import { BsClipboardData } from 'react-icons/bs';
import { BiDollarCircle } from 'react-icons/bi';

const DashboardBusinessIcons = ({ chartState, currency }) => {
	const iconOrders = <BsClipboardData className='fs-3' />;
	const iconSales = <BiDollarCircle className='fs-2' />;
	const getNumber = (arr) => {
		const final = arr.reduce((acc, val) => {
			return acc + val;
		}, 0);
		return final;
	};
	const sales = getNumber(chartState.chartData.reversedSales);
	const orders = getNumber(chartState.chartData.reversedOrders);

	return (
		<div className='col-12 col-md-4 d-flex flex-wrap mt-3'>
			<DashboardBusinessIconsCard
				title={'Sales'}
				icons={iconSales}
				number={sales}
				currency={currency}
			/>
			<DashboardBusinessIconsCard
				title={'Orders'}
				icons={iconOrders}
				number={orders}
				currency={currency}
			/>
		</div>
	);
};

export default DashboardBusinessIcons;
