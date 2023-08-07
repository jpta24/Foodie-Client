import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { v4 as uuidv4 } from 'uuid';

import { MdOutlineDashboard } from 'react-icons/md';
import {
	RiTableLine,
	RiBillLine,
	RiStore2Line,
	RiShoppingCartLine,
	RiShoppingBagLine,
	RiHomeHeartLine,
	RiAddCircleLine,
} from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUserCircle, FaUsers } from 'react-icons/fa';
import { BsBookmarkHeart } from 'react-icons/bs';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import { getAPI } from '../utils/api';

const Sidebar = () => {
	const { user: userID, language: lang } = useContext(AuthContext);
	const [user, setUser] = useState('');

	////////////////////GET THE DATA
	useEffect(() => {
		if (userID) {
			const url = `users/sidebar/${userID._id}`;
			const thenFunction = (response) => {
				setUser(response.data);
			};
			getAPI(url, thenFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userID]);

	const personal = {
		personal: languages[0][lang].sidebar.personal[0],
		dashboard: languages[0][lang].sidebar.personal[1],
		profile: languages[0][lang].sidebar.personal[2],
		cart: languages[0][lang].sidebar.personal[3],
		orders: languages[0][lang].sidebar.personal[4],
		savedBusiness: languages[0][lang].sidebar.personal[5],
		savedProducts: languages[0][lang].sidebar.personal[6],
	};

	const business = {
		business: languages[0][lang].sidebar.business[0],
		dashboard: languages[0][lang].sidebar.business[1],
		store: languages[0][lang].sidebar.business[2],
		memberships: languages[0][lang].sidebar.business[3],
		orders: languages[0][lang].sidebar.business[4],
		products: languages[0][lang].sidebar.business[5],
		employees: languages[0][lang].sidebar.business[6],
		billing: languages[0][lang].sidebar.business[7],
		createBusiness: languages[0][lang].sidebar.business[8],
	};

	const [dashboard, setDashboard] = useState('Personal');
	const [actualState, setActualState] = useState('Dashboard');

	const buzList = [
		{
			icon: <MdOutlineDashboard className='fs-4' />,
			text: business.dashboard,
			field: 'Dashboard',
		},
		{
			icon: <RiStore2Line className='fs-4' />,
			text: business.store,
			field: 'Store',
		},
		{
			icon: <RiTableLine className='fs-4' />,
			text: business.memberships,
			field: 'Memberships',
		},
		{
			icon: <RiShoppingBagLine className='fs-4' />,
			text: business.orders,
			field: 'Orders',
		},
		{
			icon: <RxDashboard className='fs-4' />,
			text: business.products,
			field: 'Products',
		},
		{
			icon: <FaUsers className='fs-4' />,
			text: business.employees,
			field: 'Employees',
		},
		{
			icon: <RiBillLine className='fs-4' />,
			text: business.billing,
			field: 'Billing',
		},
	];
	const personalList = [
		{
			icon: <MdOutlineDashboard className='fs-4' />,
			text: personal.dashboard,
			field: 'Dashboard',
		},
		{
			icon: <FaRegUserCircle className='fs-4' />,
			text: personal.profile,
			field: 'Profile',
		},
		{
			icon: <RiShoppingCartLine className='fs-4' />,
			text: personal.cart,
			field: 'Cart',
		},
		{
			icon: <RiShoppingBagLine className='fs-4' />,
			text: personal.orders,
			field: 'Orders',
		},
		{
			icon: <RiHomeHeartLine className='fs-4' />,
			text: personal.savedBusiness,
			field: 'SavedBusiness',
		},
		{
			icon: <BsBookmarkHeart className='fs-4' />,
			text: personal.savedProducts,
			field: 'SavedProducts',
		},
	];
	// console.log(user)
	return (
		<div className='sidebar-container d-flex flex-column text-light'>
			<div
				className='d-flex col-12 justify-content-center h6'
				style={{ cursor: 'pointer' }}
			>
				<div
					className={`col-6 py-3 ${
						dashboard === 'Business' && 'sidebar-active bg-dark'
					}`}
					onClick={() => {
						if (dashboard !== 'Business') {
							setActualState('Dashboard');
							setDashboard('Business');
						}
					}}
				>
					{business.business}
				</div>
				<div
					className={`col-6 py-3 ${
						dashboard === 'Personal' && 'sidebar-active bg-dark'
					}`}
					onClick={() => {
						if (dashboard !== 'Personal') {
							setActualState('Dashboard');
							setDashboard('Personal');
						}
					}}
				>
					{personal.personal}
				</div>
			</div>
			{dashboard === 'Business' ? (
				<div className='d-flex flex-column justify-content-center align-items-center'>
					<div className='d-flex flex-column justify-content-center align-items-end col-12 mt-3'>
						{user.business ? (
							<>
								<div
									className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
									style={{
										height: '80px',
										width: '80px',
									}}
								>
									<img
										src={user.business.logoUrl}
										alt='altLogo'
										width={65}
									/>
								</div>
								<h5 className='align-self-center my-3 foodie-title text-danger'>{user.business.name}</h5>

								{buzList.map((elem) => {
									return (
										<div
											className={`py-2 ps-2 col-11 text-start ${
												actualState === elem.field &&
												dashboard === 'Business' &&
												'sidebar-page-active'
											}`}
											style={{ cursor: 'pointer' }}
											onClick={() => setActualState(elem.field)}
											key={uuidv4()}
										>
											<span>{elem.icon}</span>
											<span className='h6 mx-3'>{elem.text}</span>
										</div>
									);
								})}
							</>
						) : (
							<>
								<div
									className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
									style={{
										height: '80px',
										width: '80px',
									}}
								>
									<FaRegUserCircle style={{ fontSize: '55px' }} />
								</div>

								<div
									className={`py-2 ps-2 col-11 text-start mt-5 ${
										dashboard === 'Business' && 'sidebar-page-active'
									}`}
									style={{ cursor: 'pointer' }}
								>
									<span>
										<RiAddCircleLine className='fs-4' />
									</span>
									<span className='h6 mx-3'>
										{languages[0][lang].dashboard.btnAddBusiness}
									</span>
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<div className='d-flex flex-column justify-content-center align-items-center'>
					<div className='d-flex flex-column justify-content-center align-items-end col-12 mt-3'>
						<div
							className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
							style={{
								height: '80px',
								width: '80px',
							}}
						>
							<img src={user.avatarUrl} alt='altLogo' width={55} />
						</div>
						<h5 className='align-self-center my-3'>{user.name}</h5>

						{personalList.map((elem) => {
							return (
								<div
									className={`py-2 ps-2 col-11 text-start ${
										actualState === elem.field &&
										dashboard === 'Personal' &&
										'sidebar-page-active'
									}`}
									style={{ cursor: 'pointer' }}
									onClick={() => setActualState(elem.field)}
									key={uuidv4()}
								>
									<span>{elem.icon}</span>
									<span className='h6 mx-3'>{elem.text}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
