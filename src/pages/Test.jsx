import Sidebar from '../components/Sidebar';
import {  useLocation } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import RedirectPage from './RedirectPage';

function Test() {
	const location = useLocation();
	const [showSidebar, setShowSidebar] = useState(false);

	// Determinar si la ruta actual coincide con las rutas que requieren el Sidebar
	const checkShowSidebar = () => {
		const routesWithSidebar = ['/dashboard', '/profile', '/cart', '/orders','/test'];
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
		<div className='d-flex'>
			{showSidebar && <Sidebar />}
			<RedirectPage/>
		</div>				
	);
}

export default Test;
