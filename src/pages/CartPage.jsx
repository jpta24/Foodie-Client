import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { Button, Form, Modal } from 'react-bootstrap';

import CartCard from '../components/CartCard';

import { v4 as uuidv4 } from 'uuid';
import PayMethod from '../components/PayMethod';
import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import { putAPI } from '../utils/api';
import { toastifySuccess, toastifyError } from '../utils/tostify';

import Loading from '../components/Loading';
import FormatDelivery from '../components/FormatDelivery';

import { handleFileUpload } from '../utils/functions';

const CartPage = () => {
	const { language: lang } = useContext(AuthContext);
	const { user } = useContext(AuthContext);
	const { cart, setCart, getCartData, setUSer } = useContext(CartContext);
	const navigate = useNavigate();

	const [summary, setSummary] = useState(0);
	const [business, setBusiness] = useState(0);
	const [show, setShow] = useState(false);
	const [showPP, setShowPP] = useState(false);
	const [showZelle, setShowZelle] = useState(false);

	const [paymentImg, setPaymentImg] = useState(null);
	const [currentPaymentImg, setCurrentPaymentImg] = useState(null);

	const imgSetterFunction = (field, string) => {
		setPaymentImg(string);
		setCurrentPaymentImg(string);
	};

	const handleClose = () => setShow(false);
	const handleClosePP = () => setShowPP(false);
	const handleCloseZelle = () => setShowZelle(false);

	const updateSummary = () => {
		const arrSubtotalElem = document.querySelectorAll('.subtotal');
		let arrSubtotal = [];
		for (let i = 0; i < arrSubtotalElem.length; i++) {
			arrSubtotal.push(+arrSubtotalElem[i].innerText.split(' ')[1]);
		}
		setSummary(
			arrSubtotal.reduce((acc, val) => {
				return acc + val;
			})
		);
	};

	let buzs;
	let buzsNames;

	const [payment, setPayment] = useState('cash');

	const [delivery, setDelivery] = useState('delivery');

	const initialAddress = {
		street: '',
		name: '',
		note: '',
		phone: '',
	};

	const [address, setAddress] = useState(initialAddress);

	const [errorMessage, setErrorMessage] = useState(undefined);

	const handlePagination = (word) => {
		if (word === 'less') {
			setBusiness(business - 1);
		} else {
			setBusiness(business + 1);
		}
	};
	const handlePayment = () => {
		if (payment === 'cash') {
			handlePlaceOrder();
		} else if (payment === 'pp' || payment === 'card') {
			setShowPP(true);
		} else {
			setShowZelle(true);
		}
	};

	const handlePlaceOrder = (details) => {
		if (address.name === '' || address.phone === '') {
			return setErrorMessage(`${languages[0][lang].cart.error}`);
		} else {
			const productsOrder = cart
				.filter((buzFilt) => {
					return (
						buzFilt.product.business &&
						buzFilt.product.business._id === buzs[business]
					);
				})
				.map((product) => {
					return { product: product.product._id, quantity: product.quantity, price:product.product.price };
				});

			const order = {
				business: buzs[business],
				user: user._id,
				status:
					payment === 'pp' || payment === 'card'
						? 'confirmed'
						: payment === 'pagoMovil' || payment === 'zelle'
						? 'payed'
						: 'pending',
				paymentMethod: payment,
				format: delivery,
				products: productsOrder,
				note: address,
				summary: summary,
				details: details || {},
			};

			const requestBody = {
				order,
			};

			const url = `users/order/${user._id}`;
			const thenFunction = (response) => {
				toastifySuccess(`${languages[0][lang].tostify.orderPlaced}`);
				setCart(null);
				getCartData();
				const userUpdated = response.data;
				setUSer(userUpdated);

				if (buzs.length > 1) {
					setShow(true);
				} else {
					navigate(`/user-orders/${user._id}`);
				}
			};
			const errorFunction = (error) => {
				toastifyError(`${languages[0][lang].tostify.orderError}`);
			};
			putAPI(url, requestBody, thenFunction, errorFunction);
		}
	};

	if (user && cart) {
		let currency = '$';
		if (cart.length > 0) {
			currency = cart[0].product.business.currency;
		}

		const businessIdArr = cart.map((prod) => {
			return prod.product.business && prod.product.business._id;
		});
		buzs = [...new Set(businessIdArr)];

		const businessNameArr = cart.map((prod) => {
			return prod.product.business.name;
		});
		buzsNames = [...new Set(businessNameArr)];

		// console.log(Object.entries(cart[0].product.business.format).map((elem)=>{return (elem[0]==='delivery'?[elem[0],elem[1].delivery]:elem)}));

		return (
			<div className='container p-0 content-container'>
				<div className='row d-flex flex-row rounded border border-dark'>
					<div className='col-12 col-md-7'>
						<div className='col-11 d-flex flex-column p-2 my-2 col-12 text-start'>
							<div className='ms-4'>
								<h1>
									{languages[0][lang].cart.hi}, {user.username}
								</h1>
								<h3>
									{cart.length === 0
										? `${languages[0][lang].cart.empty}`
										: `${languages[0][lang].cart.yourCart} ${buzsNames[business]}`}
								</h3>
							</div>

							<div className='col-12 cartProducts'>
								{cart
									.filter((buzFilt) => {
										return (
											buzFilt.product.business &&
											buzFilt.product.business._id === buzs[business]
										);
									})
									.map((product) => {
										return (
											<CartCard
												key={uuidv4()}
												product={product}
												updateSummary={updateSummary}
												currency={currency}
											/>
										);
									})}
							</div>
							{buzs.length > 1 && (
								<div className='d-flex justify-content-center'>
									{business !== 0 && (
										<div>
											<svg
												onClick={() => handlePagination('less')}
												style={{ cursor: 'pointer' }}
												stroke='currentColor'
												fill='currentColor'
												strokeWidth='0'
												viewBox='0 0 24 24'
												height='1em'
												width='1em'
												xmlns='http://www.w3.org/2000/svg'
											>
												<polyline
													fill='none'
													stroke='#000'
													strokeWidth='2'
													points='7 2 17 12 7 22'
													transform='matrix(-1 0 0 1 24 0)'
												></polyline>
											</svg>
										</div>
									)}
									<div className='mx-3'>
										<span>{`${business + 1} of ${buzs.length}`}</span>
									</div>
									{business + 1 !== buzs.length && (
										<div>
											<svg
												onClick={() => handlePagination('more')}
												style={{ cursor: 'pointer' }}
												stroke='currentColor'
												fill='currentColor'
												strokeWidth='0'
												viewBox='0 0 24 24'
												height='1em'
												width='1em'
												xmlns='http://www.w3.org/2000/svg'
											>
												<polyline
													fill='none'
													stroke='#000'
													strokeWidth='2'
													points='7 2 17 12 7 22'
												></polyline>
											</svg>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					<div className='col-12 col-md-5'>
						<div className='col-11 d-flex flex-column p-2 mt-2 py-3 form-control bg-dark cartSummary border border-dark text-light'>
							<h2 className='fw-bold text-light'>
								{' '}
								{languages[0][lang].cart.summary} {currency}{' '}
								{summary.toFixed(2)}
							</h2>

							<h4 className='mb-0'>{languages[0][lang].cart.deliveryFormat}</h4>
							<div className='d-flex px-2 mx-2 justify-content-around'>
								{cart.length !== 0 &&
									Object.entries(
										cart.filter((buzFilt) => {
											return (
												buzFilt.product.business &&
												buzFilt.product.business._id === buzs[business]
											);
										})[0].product.business.format
									)
										.map((elem) => {
											return elem[0] === 'delivery'
												? [elem[0], elem[1].delivery]
												: elem;
										})
										.filter((format) => format[1] === true)
										.map((elem) => {
											return (
												<FormatDelivery
													key={uuidv4()}
													onclick={() => {
														setDelivery(elem[0]);
													}}
													src={
														delivery === elem[0]
															? iconsCloud[0][`${elem[0]}Active`]
															: iconsCloud[0][`${elem[0]}Inactive`]
													}
												/>
											);
										})}
							</div>

							<div className='d-flex flex-column justify-content-between mb-2 '>
								<div className='d-flex'>
									<Form.Group
										className='mb-1 col-6 px-2 d-flex flex-column align-items-start'
										controlId='formBasicAddressName'
									>
										<Form.Label className='mb-0'>
											{languages[0][lang].cart.name}
										</Form.Label>
										<Form.Control
											className='py-0'
											type='text'
											placeholder={languages[0][lang].cart.recipientPh}
											name='name'
											value={address.name}
											onChange={(e) => {
												setAddress({
													...address,
													[e.target.name]: e.target.value,
												});
											}}
										/>
									</Form.Group>
									<Form.Group
										className='mb-1 col-6 px-2 d-flex flex-column align-items-start'
										controlId='formBasicphone'
									>
										<Form.Label className='mb-0'>
											{languages[0][lang].cart.phone}
										</Form.Label>
										<Form.Control
											className='py-0'
											type='tel'
											placeholder={languages[0][lang].cart.phoneph}
											name='phone'
											value={address.phone}
											onChange={(e) => {
												setAddress({
													...address,
													[e.target.name]: e.target.value,
												});
											}}
										/>
									</Form.Group>
								</div>

								<Form.Group
									className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
									controlId='formBasicAddressStreet'
								>
									<Form.Label className='mb-0'>
										{languages[0][lang].cart.address}
									</Form.Label>
									<Form.Control
										className='py-0'
										type='text'
										placeholder={languages[0][lang].cart.addressPh}
										name='street'
										value={address.street}
										onChange={(e) => {
											setAddress({
												...address,
												[e.target.name]: e.target.value,
											});
										}}
									/>
								</Form.Group>

								<Form.Group
									className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
									controlId='formBasicNote'
								>
									<Form.Label className='mb-0'>
										{languages[0][lang].cart.note}
									</Form.Label>
									<Form.Control
										className='py-0'
										type='text'
										placeholder={languages[0][lang].cart.notePh}
										name='note'
										value={address.note}
										onChange={(e) => {
											setAddress({
												...address,
												[e.target.name]: e.target.value,
											});
										}}
									/>
								</Form.Group>
								{errorMessage && (
									<p className='text-warning fs-6 mb-0 pb-0'>{errorMessage}</p>
								)}
							</div>

							<h4 className='mb-0'>{languages[0][lang].cart.paymentMethod}</h4>
							<div className='d-flex px-2 mx-2 justify-content-around flex-wrap'>
								{cart.length !== 0 &&
									Object.entries(
										cart.filter((buzFilt) => {
											return (
												buzFilt.product.business &&
												buzFilt.product.business._id === buzs[business]
											);
										})[0].product.business.payment
									)
										.filter((pay) => pay[1] === true)
										.map((elem) => {
											return (
												<PayMethod
													key={uuidv4()}
													onclick={() => {
														setPayment(elem[0]);
													}}
													src={
														payment === elem[0]
															? iconsCloud[0][`${elem[0]}Active`]
															: iconsCloud[0][`${elem[0]}Inactive`]
													}
												/>
											);
										})}
							</div>

							<div className='col-12 my-2'>
								{cart.length !== 0 && (
									<Button
										variant='primary'
										size='lg'
										type='submit'
										className='mx-2 my-1 col-8 col-md-8 col-sm-6'
										onClick={handlePayment}
									>
										{languages[0][lang].cart.btnOrder}
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].cart.mTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{languages[0][lang].cart.mBody}</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							{languages[0][lang].cart.btnKeep}
						</Button>
						<Button variant='danger' href={`/user-orders/${user._id}`}>
							{languages[0][lang].cart.btnOrders}
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={showPP}
					onHide={handleClosePP}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].cart.mPayment}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p className='h3 text-center'>
							{languages[0][lang].cart.summary} {summary.toFixed(2)} {currency}
						</p>
						<PayPalScriptProvider
							options={{ 'client-id': process.env.REACT_APP_pp }}
						>
							<PayPalButtons
								createOrder={(data, actions) => {
									return actions.order.create({
										purchase_units: [
											{
												amount: {
													value: summary.toFixed(2),
												},
												payee: {
													email_address:
														business.payment.pp.email ||
														'sb-ru1lq25295440@business.example.com',
												},
											},
										],
									});
								}}
								onApprove={async (data, actions) => {
									const details = await actions.order.capture();
									setShowPP(false);
									handlePlaceOrder(details);
								}}
							/>
						</PayPalScriptProvider>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClosePP}>
							{languages[0][lang].cart.btnCancel}
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={showZelle}
					onHide={handleCloseZelle}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].cart.mZelle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p className='h3 text-center'>
							{languages[0][lang].cart.summary} {summary.toFixed(2)} {currency}
						</p>
						<p className='text-center'>{languages[0][lang].cart.mZelleBody}</p>
						{paymentImg && (
							<div className='col-md-4 col-6 m-2 mx-auto'>
								<div
									className={`p-2 d-flex justify-items-center m-auto $`}
									style={{
										width: '100px',
										height: '200px',
										backgroundImage: `url('${paymentImg}')`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
									}}
								></div>
							</div>
						)}
						<Form.Group
							className='mb-3 col-md-10 d-flex flex-column align-items-start'
							controlId='formBasicProductName'
						>
							<Form.Label>{languages[0][lang].cart.image}</Form.Label>
							<Form.Control
								type='file'
								onChange={(e) =>
									handleFileUpload(
										e,
										currentPaymentImg,
										imgSetterFunction,
										'mainImg'
									)
								}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleCloseZelle}>
							{languages[0][lang].cart.btnCancel}
						</Button>
						{paymentImg && (
							<Button
								variant='danger'
								onClick={() => {
									const details = { paymentImg };
									setShowZelle(false);
									handlePlaceOrder(details);
								}}
							>
								{languages[0][lang].cart.btnConfirm}
							</Button>
						)}
					</Modal.Footer>
				</Modal>
			</div>
		);
	} else if (cart === null) {
		<div className='container p-0'>
			<div className='row d-flex flex-row rounded border border-light'>
				<div className='col-12 col-md-7'>
					<div className='col-11 d-flex flex-column p-2 mt-2 form-control'>
						<h1>
							{languages[0][lang].cart.hi}, {user.username}
						</h1>
						<h3>{languages[0][lang].cart.empty}</h3>
					</div>
				</div>
			</div>
		</div>;
	} else {
		return (
			<div className='flex-grow-1'>
				<Loading />
			</div>
		);
	}
};

export default CartPage;
