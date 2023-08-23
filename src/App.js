import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/auth.context';

import { ToastContainer } from 'react-toastify';
import IsAnon from './components/IsAnon';
import Navbar from './components/Nabvar';
import Sidebar from './components/Sidebar';
import IsPrivate from './components/IsPrivate';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CreateBusiness from './pages/CreateBusiness';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import BusinessView from './pages/BusinessView';
import BusinessProducts from './pages/BusinessProducts';
import CreateProduct from './pages/CreateProduct';
import ProductDetails from './pages/ProductDetails';
import Business from './pages/Business';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import BusinessOrders from './pages/BusinessOrders';
import LoginBizPage from './pages/LoginBizPage';
import SignupBizPage from './pages/SignupBizPage';
import EditProduct from './pages/EditProduct';
import RedirectPage from './pages/RedirectPage';
import EditBusiness from './pages/EditBusiness';
import About from './pages/AboutUs';
import EditProfilePage from './pages/EditProfile';

import Test from './pages/Test';
import MembershipPage from './pages/MembershipPage';
import PrivatePolicyPage from './pages/PrivatePolicyPage';
import TermsPage from './pages/TermsPage';
import DashboardBusiness from './pages/DashboardBusiness';

function App() {
	const { isDark } = useContext(AuthContext);
	const location = useLocation();
	const [showSidebar, setShowSidebar] = useState(false);

	// Determinar si la ruta actual coincide con las rutas que requieren el Sidebar
	const routesWithSidebar = [
		'/user-dashboard',
		'/business-dashboard',
		'/profile',
		'/edit-profile',
		'/cart',
		'/user-orders/',
		'/create-business',
		'/edit-business',
		'/memberships',
		'/products',
		'/create-product',
		'/edit-product',
		'/business-orders',
		'/employees',
		'/billing',
		'/my-business',
		'/test',
	];
	const checkShowSidebar = () => {
		setShowSidebar(
			routesWithSidebar.some((route) => location.pathname.includes(route))
		);
	};
	// Llamar a checkShowSidebar cuando cambie la ruta actual
	useEffect(() => {
		checkShowSidebar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);
	return (
		<div className={`App ${isDark ? 'text-light' : 'text-dark'}`}>
			<div className={isDark ? 'dark-Bg' : 'background-shapes'} />
			<Navbar />
			<div>
				<ToastContainer className='my-5 ztoast' />
			</div>
			<div className='d-flex'>
				{showSidebar && <Sidebar routes={routesWithSidebar} />}
				<Routes>
					<Route exact path='/' element={<HomePage />} />
					<Route exact path='/about-us' element={<About />} />
					<Route
						exact
						path='/signup'
						element={
							<IsAnon>
								<SignupPage />
							</IsAnon>
						}
					/>
					<Route
						exact
						path='/login'
						element={
							<IsAnon>
								<LoginPage />
							</IsAnon>
						}
					/>
					<Route
						exact
						path='/signup/:businessName'
						element={
							<IsAnon>
								<SignupBizPage />
							</IsAnon>
						}
					/>
					<Route
						exact
						path='/login/:businessName'
						element={
							<IsAnon>
								<LoginBizPage />
							</IsAnon>
						}
					/>
					<Route
						exact
						path='/user-dashboard/:userID'
						element={
							<IsPrivate>
								<Dashboard />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/profile/:userID'
						element={
							<IsPrivate>
								<ProfilePage />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/edit-profile/:userID'
						element={
							<IsPrivate>
								<EditProfilePage />
							</IsPrivate>
						}
					/>

					<Route
						exact
						path='/cart/:userID'
						element={
							<IsPrivate>
								<CartPage />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/user-orders/:userID'
						element={
							<IsPrivate>
								<OrdersPage />
							</IsPrivate>
						}
					/>

					<Route
						exact
						path='/redirect'
						element={
							<IsPrivate>
								<RedirectPage />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/mySavedProducts'
						element={
							<IsPrivate>
								<RedirectPage />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/business-dashboard/:businessName'
						element={
							<IsPrivate>
								<DashboardBusiness />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/my-business/:businessName'
						element={
							<IsPrivate>
								<BusinessView />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/create-business'
						element={
							<IsPrivate>
								<CreateBusiness />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/edit-business/:businessName'
						element={
							<IsPrivate>
								<EditBusiness />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/memberships/:businessName'
						element={<MembershipPage />}
					/>
					<Route
						exact
						path='/myVisitedBusiness'
						element={
							<IsPrivate>
								<RedirectPage />
							</IsPrivate>
						}
					/>
					<Route exact path='/:businessName' element={<Business />} />
					<Route
						exact
						path='/view-business/:businessName'
						element={<BusinessView />}
					/>
					<Route
						exact
						path='/:businessName/products'
						element={
							<IsPrivate>
								<BusinessProducts />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/product/:productID'
						element={<ProductDetails />}
					/>
					<Route
						exact
						path='/:businessName/create-product'
						element={
							<IsPrivate>
								<CreateProduct />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='/:businessName/edit-product/:productID'
						element={
							<IsPrivate>
								<EditProduct />
							</IsPrivate>
						}
					/>
					<Route
						exact
						path='business-orders/:businessName'
						element={
							<IsPrivate>
								<BusinessOrders />
							</IsPrivate>
						}
					/>
					<Route exact path='/private-policy' element={<PrivatePolicyPage />} />
					<Route exact path='/terms-conditions' element={<TermsPage />} />
					<Route exact path='/errorPage' element={<ErrorPage />} />
					<Route exact path='/test' element={<Test />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
