import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { Row, Button } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className='dashboard container justify-content-center'>
			<h1 className='my-2'>Dashboard</h1>
			<Row xs={1} md={2} className='g-4 px-3 my-3 justify-content-center'>
			{user.business && (
				<DashboardCard href={`/${user.business.name}`} button={user.business.name} src={user.business.logoUrl}/>
                )}
                <DashboardCard href={`/profile/${user._id}`} button='Profile' src='/userActive.png'/>
                <DashboardCard href={`/create-business`} button='+ Business' src='/businessActive.png' />
                <DashboardCard href='/cart' button='Cart' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png' />
                <DashboardCard href='/orders' button='Orders' src='https://www.iconbunny.com/icons/media/catalog/product/6/1/611.8-orders-icon-iconbunny.jpg'/>
				<DashboardCard href='/mySavedBusiness' button='♥ Business' src='https://cdn.iconscout.com/icon/free/png-256/market-144-910307.png'/>
                <DashboardCard href='/mySavedProducts' button='♥ Products' src='https://cdn3.iconfinder.com/data/icons/restaurant-element/64/dinner-food-meal-juice-evening-512.png'/>
			</Row>
		</div>
	);
};

export default Dashboard;
