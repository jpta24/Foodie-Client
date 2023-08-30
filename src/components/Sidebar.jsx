import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { v4 as uuidv4 } from 'uuid';

import { IoCloseSharp } from 'react-icons/io5';
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

import languages from '../data/language.json';
import { getAPI } from '../utils/api';

const Sidebar = ({ routes }) => {
	const location = useLocation();
	const { user: userID, language: lang } = useContext(AuthContext);
	const [user, setUser] = useState('');

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

	const [dashboard, setDashboard] = useState('Personal');
	const [actualState, setActualState] = useState('Dashboard');

	const [collapsed, setCollapsed] = useState(true);

	const mobileView = window.innerWidth < 600;

	useEffect(() => {
		const actualPage = routes.filter((route) =>
			location.pathname.includes(route)
		)[0];
		const pages = [
			{
				state: 'Dashboard',
				pages: ['/user-dashboard'],
				dashboard: 'Personal',
			},
			{
				state: 'Profile',
				pages: ['/profile', '/edit-profile'],
				dashboard: 'Personal',
			},
			{
				state: 'Cart',
				pages: ['/cart'],
				dashboard: 'Personal',
			},
			{
				state: 'Orders',
				pages: ['/user-orders'],
				dashboard: 'Personal',
			},
			{
				state: 'SavedBusiness',
				pages: ['/saved-Products'],
				dashboard: 'Personal',
			},
			{
				state: 'SavedBusiness',
				pages: ['/saved-business'],
				dashboard: 'Personal',
			},
			{
				state: 'Dashboard',
				pages: ['/business-dashboard'],
				dashboard: 'Business',
			},
			{
				state: 'Store',
				pages: ['/my-business', '/edit-business'],
				dashboard: 'Business',
			},
			{
				state: 'Memberships',
				pages: ['/memberships'],
				dashboard: 'Business',
			},
			{
				state: 'Orders',
				pages: ['/business-orders'],
				dashboard: 'Business',
			},
			{
				state: 'Products',
				pages: ['/products', '/create-product', '/edit-product'],
				dashboard: 'Business',
			},
			{
				state: 'Employess',
				pages: ['/employees'],
				dashboard: 'Business',
			},
			{
				state: 'Billing',
				pages: ['/billing'],
				dashboard: 'Business',
			},
		];
		const newState = pages.filter((page) => page.pages.includes(actualPage))[0];
		if (newState) {
			setDashboard(newState.dashboard);
			setActualState(newState.state);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

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

	const buzList = [
		{
			icon: <MdOutlineDashboard className='fs-4' />,
			text: business.dashboard,
			field: 'Dashboard',
			link: `/business-dashboard/${
				user.business ? user.business.name.split(' ').join('-') : ''
			}`,
		},
		{
			icon: <RiStore2Line className='fs-4' />,
			text: business.store,
			field: 'Store',
			link: `/my-business/${
				user.business ? user.business.name.split(' ').join('-') : ''
			}`,
		},
		{
			icon: <RiTableLine className='fs-4' />,
			text: business.memberships,
			field: 'Memberships',
			link: `/memberships/${
				user.business ? user.business.name.split(' ').join('-') : ''
			}`,
		},
		{
			icon: <RiShoppingBagLine className='fs-4' />,
			text: business.orders,
			field: 'Orders',
			link: `/business-orders/${
				user.business ? user.business.name.split(' ').join('-') : ''
			}`,
		},
		{
			icon: <RxDashboard className='fs-4' />,
			text: business.products,
			field: 'Products',
			link: `${
				user.business ? user.business.name.split(' ').join('-') : ''
			}/products`,
		},
		// {
		// 	icon: <FaUsers className='fs-4' />,
		// 	text: business.employees,
		// 	field: 'Employees',
		// 	link: `/employees/${
		// 		user.business ? user.business.name.split(' ').join('-') : ''
		// 	}`,
		// },
		// {
		// 	icon: <RiBillLine className='fs-4' />,
		// 	text: business.billing,
		// 	field: 'Billing',
		// 	link: `/billing/${
		// 		user.business ? user.business.name.split(' ').join('-') : ''
		// 	}`,
		// },
	];
	const personalList = [
		{
			icon: <MdOutlineDashboard className='fs-4' />,
			text: personal.dashboard,
			field: 'Dashboard',
			link: `/user-dashboard/${user._id}`,
		},
		{
			icon: <FaRegUserCircle className='fs-4' />,
			text: personal.profile,
			field: 'Profile',
			link: `/profile/${user._id}`,
		},
		{
			icon: <RiShoppingCartLine className='fs-4' />,
			text: personal.cart,
			field: 'Cart',
			link: `/cart/${user._id}`,
		},
		{
			icon: <RiShoppingBagLine className='fs-4' />,
			text: personal.orders,
			field: 'Orders',
			link: `/user-orders/${user._id}`,
		},
		// {
		// 	icon: <RiHomeHeartLine className='fs-4' />,
		// 	text: personal.savedBusiness,
		// 	field: 'SavedBusiness',
		// 	link: `/redirect/`,
		// },
		// {
		// 	icon: <BsBookmarkHeart className='fs-4' />,
		// 	text: personal.savedProducts,
		// 	field: 'SavedProducts',
		// 	link: `/redirect/`,
		// },
	];
	// console.log(user)
	if (mobileView && collapsed) {
		return (
			<div
				className='sidebar-collapsed'
				onClick={() => setCollapsed(!collapsed)}
			></div>
		);
	} else {
		return (
			<>
				<div
					className={`${
						mobileView && !collapsed ? 'sidebar-mobile' : 'sidebar-container'
					} d-flex flex-column text-light`}
				>
					<div className='d-flex col-12 justify-content-center h6'>
						<Link
							to={`/business-dashboard/${
								user.business ? user.business.name.split(' ').join('-') : ''
							}`}
							style={{ cursor: 'pointer', color: 'white' }}
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
						</Link>
						<Link
							to={`/user-dashboard/${user._id}`}
							style={{ cursor: 'pointer', color: 'white' }}
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
						</Link>
					</div>
					{mobileView && (
						<div
							className='sidebar-close'
							onClick={() => setCollapsed(!collapsed)}
						>
							<IoCloseSharp />
						</div>
					)}
					{dashboard === 'Business' ? (
						<div className='d-flex flex-column justify-content-center align-items-center'>
							<div className='d-flex flex-column justify-content-center align-items-center col-12 mt-3'>
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
										<h5 className='align-self-center my-3 foodie-title text-danger'>
											{user.business.name}
										</h5>

										{buzList.map((elem) => {
											return (
												<Link
													to={elem.link}
													className={`py-2 ps-2 col-10 text-start ${
														actualState === elem.field &&
														dashboard === 'Business' &&
														'sidebar-page-active'
													}`}
													style={{ cursor: 'pointer', color: 'white' }}
													onClick={() => {
														setActualState(elem.field);
														setCollapsed(true);
													}}
													key={uuidv4()}
												>
													<span>{elem.icon}</span>
													<span className='h6 mx-3'>{elem.text}</span>
												</Link>
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
											className={`py-2 ps-2 col-10 text-start mt-5 ${
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
							<div className='d-flex flex-column justify-content-center align-items-center col-12 mt-3'>
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
										<Link
											to={elem.link}
											className={`py-2 ps-2 col-10 text-start ${
												actualState === elem.field &&
												dashboard === 'Personal' &&
												'sidebar-page-active'
											}`}
											style={{ cursor: 'pointer', color: 'white' }}
											onClick={() => {
												setActualState(elem.field);
												setCollapsed(true);
											}}
											key={uuidv4()}
										>
											<span>{elem.icon}</span>
											<span className='h6 mx-3'>{elem.text}</span>
										</Link>
									);
								})}
							</div>
						</div>
					)}
				</div>
				{mobileView && !collapsed && <div className='sidebar-side'></div>}
			</>
		);
	}
	// else {
	// 	return (
	// 		<div
	// 			className={`${
	// 				!mobileView || !collapsed ? 'sidebar-container' : 'sidebar-collapsed'
	// 			} d-flex flex-column text-light`}
	// 		>
	// 			<div className='d-flex col-12 justify-content-center h6'>
	// 				<Link
	// 					to={`/business-dashboard/${
	// 						user.business ? user.business.name.split(' ').join('-') : ''
	// 					}`}
	// 					style={{ cursor: 'pointer', color: 'white' }}
	// 					className={`col-6 py-3 ${
	// 						dashboard === 'Business' && 'sidebar-active bg-dark'
	// 					}`}
	// 					onClick={() => {
	// 						if (dashboard !== 'Business') {
	// 							setActualState('Dashboard');
	// 							setDashboard('Business');
	// 						}
	// 					}}
	// 				>
	// 					{business.business}
	// 				</Link>
	// 				<Link
	// 					to={`/user-dashboard/${user._id}`}
	// 					style={{ cursor: 'pointer', color: 'white' }}
	// 					className={`col-6 py-3 ${
	// 						dashboard === 'Personal' && 'sidebar-active bg-dark'
	// 					}`}
	// 					onClick={() => {
	// 						if (dashboard !== 'Personal') {
	// 							setActualState('Dashboard');
	// 							setDashboard('Personal');
	// 						}
	// 					}}
	// 				>
	// 					{personal.personal}
	// 				</Link>
	// 			</div>
	// 			{mobileView &&
	// 				(collapsed ? (
	// 					<div
	// 						className='sidebar-hamburger border'
	// 						onClick={() => setCollapsed(!collapsed)}
	// 					>
	// 						<GiHamburgerMenu />
	// 					</div>
	// 				) : (
	// 					<div
	// 						className='sidebar-close border'
	// 						onClick={() => setCollapsed(!collapsed)}
	// 					>
	// 						<IoCloseSharp />
	// 					</div>
	// 				))}
	// 			{dashboard === 'Business' ? (
	// 				<div className='d-flex flex-column justify-content-center align-items-center'>
	// 					<div className='d-flex flex-column justify-content-center align-items-center col-12 mt-3'>
	// 						{user.business ? (
	// 							<>
	// 								<div
	// 									className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
	// 									style={{
	// 										height: '80px',
	// 										width: '80px',
	// 									}}
	// 								>
	// 									<img src={user.business.logoUrl} alt='altLogo' width={65} />
	// 								</div>
	// 								<h5 className='align-self-center my-3 foodie-title text-danger'>
	// 									{user.business.name}
	// 								</h5>

	// 								{buzList.map((elem) => {
	// 									return (
	// 										<Link
	// 											to={elem.link}
	// 											className={`py-2 ps-2 col-10 text-start ${
	// 												actualState === elem.field &&
	// 												dashboard === 'Business' &&
	// 												'sidebar-page-active'
	// 											}`}
	// 											style={{ cursor: 'pointer', color: 'white' }}
	// 											onClick={() => setActualState(elem.field)}
	// 											key={uuidv4()}
	// 										>
	// 											<span>{elem.icon}</span>
	// 											<span className='h6 mx-3'>{elem.text}</span>
	// 										</Link>
	// 									);
	// 								})}
	// 							</>
	// 						) : (
	// 							<>
	// 								<div
	// 									className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
	// 									style={{
	// 										height: '80px',
	// 										width: '80px',
	// 									}}
	// 								>
	// 									<FaRegUserCircle style={{ fontSize: '55px' }} />
	// 								</div>

	// 								<div
	// 									className={`py-2 ps-2 col-10 text-start mt-5 ${
	// 										dashboard === 'Business' && 'sidebar-page-active'
	// 									}`}
	// 									style={{ cursor: 'pointer' }}
	// 								>
	// 									<span>
	// 										<RiAddCircleLine className='fs-4' />
	// 									</span>
	// 									<span className='h6 mx-3'>
	// 										{languages[0][lang].dashboard.btnAddBusiness}
	// 									</span>
	// 								</div>
	// 							</>
	// 						)}
	// 					</div>
	// 				</div>
	// 			) : (
	// 				<div className='d-flex flex-column justify-content-center align-items-center'>
	// 					<div className='d-flex flex-column justify-content-center align-items-center col-12 mt-3'>
	// 						<div
	// 							className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
	// 							style={{
	// 								height: '80px',
	// 								width: '80px',
	// 							}}
	// 						>
	// 							<img src={user.avatarUrl} alt='altLogo' width={55} />
	// 						</div>
	// 						<h5 className='align-self-center my-3'>{user.name}</h5>

	// 						{personalList.map((elem) => {
	// 							return (
	// 								<Link
	// 									to={elem.link}
	// 									className={`py-2 ps-2 col-10 text-start ${
	// 										actualState === elem.field &&
	// 										dashboard === 'Personal' &&
	// 										'sidebar-page-active'
	// 									}`}
	// 									style={{ cursor: 'pointer', color: 'white' }}
	// 									onClick={() => setActualState(elem.field)}
	// 									key={uuidv4()}
	// 								>
	// 									<span>{elem.icon}</span>
	// 									<span className='h6 mx-3'>{elem.text}</span>
	// 								</Link>
	// 							);
	// 						})}
	// 					</div>
	// 				</div>
	// 			)}
	// 		</div>
	// 	);
	// }
};

export default Sidebar;
