import { useState, useEffect,useContext } from 'react';
import {  useParams  } from 'react-router-dom'; 
import { AuthContext } from '../context/auth.context';

import { Row } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';

import iconsCloud from '../data/icons.json'
import languages from '../data/language.json'
import { getAPI} from '../utils/api';

const Dashboard = () => {
	const {language:lang} = useContext(AuthContext);
	const {userID } = useParams();
	const [user, setUser] = useState('')

	useEffect(() => {
		const url = `users/${userID}`;
		const thenFunction = (response) => {
            setUser(response.data)
		};
		getAPI(url, thenFunction);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
	
	let businessNameEncoded 
	if (user.business) {
		businessNameEncoded = user.business.name.split(' ').join('-')
	}
	return (
		<div className='dashboard container justify-content-center'>
			<h1 className='my-2'>{languages[0][lang].dashboard.title}</h1>
			<Row xs={1} md={2} className='g-4 px-3 my-3 justify-content-center'>
				{user.business ? (
				<DashboardCard href={`/${businessNameEncoded}/dashboard`} button={languages[0][lang].dashboard.btnBusiness} src={iconsCloud[0].newBuz}/>
                ) : <DashboardCard href={`/create-business`} button={languages[0][lang].dashboard.btnAddBusiness} src={iconsCloud[0].newBuz} /> }
                <DashboardCard href={`/profile/${user._id+''}`} button='Profile' src={iconsCloud[0].profile}/>
				                
				
                <DashboardCard href={`/cart/${user._id}`} button={languages[0][lang].dashboard.btnCart} src={iconsCloud[0].cart} />
                <DashboardCard href={`/orders/${user._id}`} button={languages[0][lang].dashboard.btnOrders} src={iconsCloud[0].orders}/>
				<DashboardCard href='/myVisitedBusiness' button={languages[0][lang].dashboard.btnSavedBusiness} src={iconsCloud[0].savedBuz}/>
                <DashboardCard href='/mySavedProducts' button={languages[0][lang].dashboard.btnSavedProducts} src={iconsCloud[0].savedProducts}/>
			</Row>
		</div>
	);
};

export default Dashboard;
