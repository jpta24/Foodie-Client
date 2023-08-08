import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useParams, useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';
import BusinessOrdersCard from '../components/BusinessOrdersCard';
import Loading from '../components/Loading';
import OrderStatus from '../components/OrderStatus';
import { getAPI, putAPI } from '../utils/api';
import { toastifyError } from '../utils/tostify';

const BusinessOrders = () => {
	const { language: lang } = useContext(AuthContext);
	const initialState = {
		show: false,
		contact: 'seller',
		msg: '',
		order: '',
	};
	const [show, setShow] = useState(initialState);

	// const { user } = useContext(CartContext);
	const { businessName } = useParams();
	const navigate = useNavigate();

	let businessNameEncoded = businessName.split(' ').join('-');

	const [business, setBusiness] = useState('');

	const [status, setStatus] = useState('All Orders');

	const statues = ['All Orders', 'Pending', 'Payed', 'Confirmed', 'Cancelled'];

	const handleClose = () => setShow({ ...show, show: false });
	const handleModal = (msg, order, contact) => {
		setShow({ ...show, show: true, msg, order, contact });
	};

	useEffect(() => {
		const url = `business/${businessNameEncoded}`;
		const thenFunction = (response) => {
			setBusiness(response.data.business);
		};
		const errorFunction = () => {
			toastifyError(`${languages[0][lang].tostify.redirect}`);
			navigate('/');
		};
		getAPI(url, thenFunction, errorFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleStatusOrder = (order, status) => {
		const requestBody = {
			status: status,
		};

		const url = `orders/statusBusiness/${order._id}`;
		const thenFunction = (response) => {
			const businessUpdated = response.data;
			setBusiness(businessUpdated);
		};
		putAPI(url, requestBody, thenFunction);
	};

	if (business) {
		return (
			<div className='container p-0 content-container'>
				<div className='row d-flex flex-row rounded border border-light'>
					<div className='col-12 col-md-10 mx-auto'>
						<div className='col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 '>
							<h1>
								{languages[0][lang].businessOrders.hi}, {business.name}
							</h1>
							<h3>{languages[0][lang].businessOrders.orders}</h3>
							<OrderStatus
								statues={statues}
								setStatus={setStatus}
								status={status}
							/>
							<div className='col-12 cartProducts'>
								{business.orders
									.filter((filt) => {
										return (
											filt.status === status.toLocaleLowerCase() ||
											status === 'All Orders'
										);
									})
									.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
									.map((order) => {
										return (
											<BusinessOrdersCard
												key={uuidv4()}
												order={order}
												handleStatusOrder={handleStatusOrder}
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
							{languages[0][lang].businessOrders.mTitle}{' '}
							{show.contact === 'us'
								? `${languages[0][lang].businessOrders.us}`
								: `${languages[0][lang].businessOrders.seller}`}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{show.msg}{' '}
						{show.order !== '' &&
							show.contact === 'seller' &&
							`${show.order.business.address.email} ${languages[0][lang].businessOrders.or} ${show.order.business.address.telephone}`}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							{languages[0][lang].businessOrders.close}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	} else {
		return (
			<div>
				<Loading />
			</div>
		);
	}
};

export default BusinessOrders;
