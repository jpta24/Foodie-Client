import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { toastifyError } from '../utils/tostify';

import languages from '../data/language.json';
import { getAPI } from '../utils/api';
import Loading from '../components/Loading';
import DashboardOrder from '../components/DashboardOrder';
import DashboardBusinessChart from '../components/DashboardBusinessChart';
import DashboardBusinessIcons from '../components/DashboardBusinessIcons';

const DashboardBusiness = () => {
	const { language: lang } = useContext(AuthContext);
	const { businessName } = useParams();
	const navigate = useNavigate();

	let businessNameEncoded = businessName.split(' ').join('-');

	const [business, setBusiness] = useState('');

	const [chartState, setChartState] = useState('');

	useEffect(() => {
		const url = `business/dashboard/${businessNameEncoded}`;
		const thenFunction = (response) => {
			setBusiness(response.data.business);
			setChartState({
				period: 'months',
				labels: getLast31Days(),
				chartData: calculateOrdersAndSales(
					response.data.business.orders,
					'months'
				),
			});
		};
		const errorFunction = () => {
			toastifyError(`${languages[0][lang].tostify.redirect}`);
			navigate('/');
		};
		getAPI(url, thenFunction, errorFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const orders = {
		lang: lang,
		orders: business.orders,
		business: business,
		dashboard: 'business',
	};

	const getLast12Months = () => {
		const today = new Date();
		const months = [];

		const monthNames = [
			'Ene',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic',
		];

		for (let i = 11; i >= 0; i--) {
			const month = new Date(today);
			month.setMonth(today.getMonth() - i);
			const formattedMonth = monthNames[month.getMonth()];
			months.push(formattedMonth);
		}
		return months;
	};

	const getLast31Days = () => {
		const today = new Date();
		const days = [];

		for (let i = 30; i >= 0; i--) {
			const day = new Date(today);
			day.setDate(today.getDate() - i);
			const formattedDay = day.getDate();
			days.push(formattedDay);
		}

		return days;
	};

	const calculateOrdersAndSales = (data, period) => {
		const now = new Date();
		const orders = Array.from(
			{ length: period === 'months' ? 31 : 12 },
			() => 0
		);
		const sales = Array.from(
			{ length: period === 'months' ? 31 : 12 },
			() => 0
		);

		data.forEach((order) => {
			const orderDate = new Date(order.createdAt);
			const diff = Math.abs(now - orderDate);
			const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

			if (period === 'months' && daysAgo < 31 && order.status === 'confirmed') {
				orders[daysAgo]++;
				sales[daysAgo] += order.summary;
			} else if (
				period === 'year' &&
				daysAgo < 365 &&
				order.status === 'confirmed'
			) {
				const monthAgo =
					now.getMonth() -
					orderDate.getMonth() +
					12 * (now.getFullYear() - orderDate.getFullYear());
				orders[monthAgo]++;
				sales[monthAgo] += order.summary;
			}
		});
		const reversedOrders = orders.reverse();
		const reversedSales = sales.reverse();
		return { reversedOrders, reversedSales };
	};

	const handleState = (period, labelFunction) => {
		if (chartState.period !== period) {
			setChartState({
				period: period,
				labels: labelFunction(),
				chartData: calculateOrdersAndSales(business.orders, period),
			});
		}
	};
	if (business) {
		return (
			<div className='dashboard container justify-content-center content-container'>
				<h1 className='my-2 ms-4 text-start'>
					{languages[0][lang].dashboard.title}
				</h1>
				<div className='d-flex flex-wrap col-12 justify-content-around'>
					<div className='col-12 col-md-7 d-flex flex-column'>
						<div className='d-flex flex-column flex-md-row col-12'>
							<DashboardBusinessChart
								chartState={chartState}
								handleState={handleState}
								getLast12Months={getLast12Months}
								getLast31Days={getLast31Days}
							/>
							<DashboardBusinessIcons
								chartState={chartState}
								currency={business.currency}
							/>
						</div>

						<div className='border'>hola 2s</div>
					</div>
					<DashboardOrder orders={orders} />
				</div>
			</div>
		);
	} else {
		<div className='flex-grow-1'>
			<Loading />
		</div>;
	}
};

export default DashboardBusiness;
