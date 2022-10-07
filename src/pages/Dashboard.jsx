import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { Row } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';

import iconsCloud from '../data/icons.json'

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	let businessNameEncoded 
	if (user.business) {
		businessNameEncoded = user.business.name.split(' ').join('-')
	}
	return (
		<div className='dashboard container justify-content-center'>
			<h1 className='my-2'>Dashboard</h1>
			<Row xs={1} md={2} className='g-4 px-3 my-3 justify-content-center'>
				{user.business ? (
				<DashboardCard href={`/${businessNameEncoded}/dashboard`} button='Business' src={iconsCloud[0].newBuz}/>
                ) : <DashboardCard href={`/create-business`} button='+ Business' src={iconsCloud[0].newBuz} /> }
                <DashboardCard href={`/profile/${user._id}`} button='Profile' src={iconsCloud[0].profile}/>
				                
				
                <DashboardCard href={`/cart/${user._id}`} button='Cart' src={iconsCloud[0].cart} />
                <DashboardCard href={`/orders/${user._id}`} button='Orders' src={iconsCloud[0].orders}/>
				<DashboardCard href='/mySavedBusiness' button='♥ Business' src={iconsCloud[0].savedBuz}/>
                <DashboardCard href='/mySavedProducts' button='♥ Products' src={iconsCloud[0].savedProducts}/>
			</Row>
		</div>
	);
};

export default Dashboard;
