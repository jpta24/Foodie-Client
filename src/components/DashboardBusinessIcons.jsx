import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import languages from '../data/language.json';
import DashboardBusinessIconsCard from './DashboardBusinessIconsCard';
import { BsClipboardData } from 'react-icons/bs';
import { BiDollarCircle } from 'react-icons/bi';

const DashboardBusinessIcons = ({ chartState, currency }) => {
	const { language: lang } = useContext(AuthContext);
	const iconOrders = <BsClipboardData className='fs-4' />;
	const iconSales = <BiDollarCircle className='fs-3' />;
	const getNumber = (arr) => {
		const final = arr.reduce((acc, val) => {
			return acc + val;
		}, 0);
		return final;
	};
	const sales = getNumber(chartState.chartData.reversedSales);
	const orders = getNumber(chartState.chartData.reversedOrders);

	return (
		<div className='col-12 col-md-3 mx-auto d-flex flex-wrap mt-3'>
			<DashboardBusinessIconsCard
				title={languages[0][lang].dashboard.sales}
				icons={iconSales}
				number={sales}
				currency={currency}
			/>
			<DashboardBusinessIconsCard
				title={languages[0][lang].dashboard.btnOrders}
				icons={iconOrders}
				number={orders}
				currency={currency}
			/>
		</div>
	);
};

export default DashboardBusinessIcons;
