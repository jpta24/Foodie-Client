import { useState } from 'react';
import languages from '../data/language.json';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DashboardOrderCard from './DashboardOrderCard';
import DashboardOrderCardStatus from './DashboardOrderCardStatus';

const DashboardOrder = ({ orders }) => {
	const [status, setStatus] = useState('All Orders');

	const statues = ['All Orders', 'Pending', 'Payed', 'Confirmed', 'Cancelled'];
	return (
		<div className='col-12 col-md-7 col-lg-5 text-start my-3'>
			<Link
				className='ms-4 h4 text-light'
				to={orders.dashboard === 'user' ? `/user-orders/${orders.user._id}`: `/business-orders/${orders.business._id}`}
			>
				{languages[0][orders.lang].dashboard.btnOrders}
			</Link>
			<div className='col-12  d-flex flex-column align-items-center dashboard-cart mt-2'>
				<DashboardOrderCardStatus
					statues={statues}
					setStatus={setStatus}
					status={status}
				/>
				<div
					className='col-12'
					style={{ height: 'calc(100% - 31px)', overflow: 'auto' }}
				>
					{orders.orders
						.filter((filt) => {
							return (
								filt.status === status.toLocaleLowerCase() ||
								status === 'All Orders'
							);
						})
						.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((order) => {
							return <DashboardOrderCard key={uuidv4()} order={order} dashboard={orders.dashboard} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default DashboardOrder;
