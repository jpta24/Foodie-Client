import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { Modal, Button } from 'react-bootstrap';

import OrderCard from '../components/OrderCard';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';
import Loading from '../components/Loading';
import OrderStatus from '../components/OrderStatus';

import { postAPI } from '../utils/api';

const OrdersPage = () => {
	const { language: lang } = useContext(AuthContext);
	const initialState = {
		show: false,
		contact: 'seller',
		msg: '',
		order: '',
	};
	const [show, setShow] = useState(initialState);

	const [status, setStatus] = useState('All Orders');

	const statues = ['All Orders', 'Pending', 'Payed', 'Confirmed', 'Cancelled'];

	const { user, setUSer } = useContext(CartContext);

	const handleCancelOrder = (order) => {
		const requestBody = {
			status: 'cancelled',
		};

		const url = `orders/status/${order._id}`;
		const thenFunction = (response) => {
			setUSer(response.data);
		};
		postAPI(url, requestBody, thenFunction);
	};

	const handleClose = () => setShow({ ...show, show: false });
	const handleModal = (msg, order, contact) => {
		setShow({ ...show, show: true, msg, order, contact });
	};

	if (user) {
		return (
			<div className='container p-0 content-container'>
				<div className='row d-flex flex-row'>
					<div className='col-12 col-md-10 mx-auto'>
						<div className='col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 '>
							<h1>
								{languages[0][lang].orders.hi}, {user.username}
							</h1>
							<h3>{languages[0][lang].orders.orders}</h3>
							<OrderStatus
								statues={statues}
								setStatus={setStatus}
								status={status}
							/>
							<div className='col-12 cartProducts'>
								{user.orders
									.filter((filt) => {
										return (
											filt.status === status.toLocaleLowerCase() ||
											status === 'All Orders'
										);
									})
									.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
									.map((order) => {
										return (
											<OrderCard
												key={uuidv4()}
												order={order}
												handleCancelOrder={handleCancelOrder}
												handleModal={handleModal}
											/>
										);
									})}
							</div>
						</div>
					</div>
				</div>
				<Modal
					show={show.show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							{languages[0][lang].orders.mTitle}{' '}
							{show.contact === 'us'
								? `${languages[0][lang].orders.us}`
								: `${languages[0][lang].orders.seller}`}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{show.msg}{' '}
						{show.order !== '' &&
							show.contact === 'seller' &&
							`${show.order.business.address.email} ${languages[0][lang].orders.or} ${show.order.business.address.telephone}`}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							{languages[0][lang].orders.close}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	} else {
		return (
			<div className='flex-grow-1'>
				<Loading />
			</div>
		);
	}
};

export default OrdersPage;
