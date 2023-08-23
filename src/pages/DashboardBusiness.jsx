import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { toastifyError } from '../utils/tostify';

import languages from '../data/language.json';
import { getAPI } from '../utils/api';
import Loading from '../components/Loading';
import DashboardOrder from '../components/DashboardOrder';

const DashboardBusiness = () => {
	const { language: lang } = useContext(AuthContext);
	const { businessName } = useParams();
	const navigate = useNavigate();

	let businessNameEncoded = businessName.split(' ').join('-');

	const [business, setBusiness] = useState('');

	useEffect(() => {
		const url = `business/dashboard/${businessNameEncoded}`;
		const thenFunction = (response) => {
			setBusiness(response.data.business);
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
	if (business) {
		return (
			<div className='dashboard container justify-content-center content-container'>
				<h1 className='my-2 ms-4 text-start'>
					{languages[0][lang].dashboard.title}
				</h1>
				<div className='d-flex flex-wrap col-12 justify-content-around'>
					<div className='border col-5'>1</div>
					<DashboardOrder orders={orders} />
				</div>
			</div>
		);
	} else {
		<Loading />;
	}
};

export default DashboardBusiness;
