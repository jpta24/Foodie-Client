import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import languages from '../data/language.json';
import { getAPI } from '../utils/api';
import DashboardCardProd from '../components/DashboardCardProd';
import DashboardOrder from '../components/DashboardOrder';
import DashboardStores from '../components/DashboardStores';
import Loading from '../components/Loading';

const Dashboard = () => {
	const { language: lang } = useContext(AuthContext);
	const { userID } = useParams();
	const [user, setUser] = useState('');

	useEffect(() => {
		const url = `users/dashboard/${userID}`;
		const thenFunction = (response) => {
			setUser(response.data);
		};
		getAPI(url, thenFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const cart = {
		lang: lang,
		cart: user.cart,
		user: user,
	};
	const orders = {
		lang: lang,
		orders: user.orders,
		user: user,
		dashboard:'user'
	};
	const stores = {
		lang: lang,
		stores: { saved: user.savedBusiness, visited: user.visitedBusiness },
		user: user,
	};
	if (user) {
		return (
			<div className='dashboard container justify-content-center content-container'>
				<h1 className='my-2 ms-4 text-start'>
					{languages[0][lang].dashboard.title}
				</h1>
				<div className='d-flex flex-wrap col-12 justify-content-around'>
					<DashboardCardProd cart={cart} />
					<DashboardOrder orders={orders} />
					<DashboardStores stores={stores}/>
				</div>
			</div>
		);
	} else {
		<div className='flex-grow-1'>
			<Loading />
		</div>
	}
};

export default Dashboard;
