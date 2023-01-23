import { useState, useEffect } from 'react';
import {  useParams  } from 'react-router-dom'; 
import axios from 'axios';

import { Row } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';

import iconsCloud from '../data/icons.json'

const Dashboard = () => {
	const {userID } = useParams();
	const [user, setUser] = useState('')

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken"); 
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setUser(response.data)
          })
          .catch((error) => {
              console.log({error});
            })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
	
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
                <DashboardCard href={`/profile/${user._id+''}`} button='Profile' src={iconsCloud[0].profile}/>
				                
				
                <DashboardCard href={`/cart/${user._id}`} button='Cart' src={iconsCloud[0].cart} />
                <DashboardCard href={`/orders/${user._id}`} button='Orders' src={iconsCloud[0].orders}/>
				<DashboardCard href='/myVisitedBusiness' button='♥ Business' src={iconsCloud[0].savedBuz}/>
                <DashboardCard href='/mySavedProducts' button='♥ Products' src={iconsCloud[0].savedProducts}/>
			</Row>
		</div>
	);
};

export default Dashboard;
