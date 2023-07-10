import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';
import { v4 as uuidv4 } from 'uuid';

import { Modal, Button } from 'react-bootstrap';
import languages from '../data/language.json';

import ProductCard2 from '../components/ProductCard2';

import BusinessMenu from '../components/BusinessMenu';
import Loading from '../components/Loading';
import { getAPI, putAPI, deleteAPI } from '../utils/api';
import { toastifyError } from '../utils/tostify';
import CartBanner from '../components/CartBanner';
import PromotionBanner from '../components/PromotionBanner';

const Business = () => {
	const { language: lang, isDark, user } = useContext(AuthContext);

	const { cart } = useContext(CartContext);
	let summary;
	if (cart !== null && cart.length > 0) {
		const amounts = cart.map((item) => item.product.price * item.quantity);
		summary = amounts
			.reduce((acc, val) => {
				return acc + val;
			})
			.toFixed(2);
	}

	const { businessName } = useParams();
	const navigate = useNavigate();

	let businessNameEncoded = businessName.split(' ').join('-');

	const [business, setBusiness] = useState('');
	// const [searchProduct, setSearchProduct] = useState('')
	const [userSaved, setUserSaved] = useState('');

	// let initialMenu = {}
	let arrCategories = [];
	if (business.products) {
		business.products.forEach((prod) => {
			prod.categories.forEach((cate) => {
				if (!arrCategories.includes(cate)) {
					arrCategories.push(cate);
					// initialMenu[cate]=false
				}
			});
		});
	}
	// const updatedCategory = {...initialMenu,General:true}
	const [category, setCategory] = useState('General');
	// let activeCategory = 'General'

	const handleCategory = (cat) => {
		// const newCatState = {...initialMenu,[cat]:true}
		setCategory(cat);
	};

	const modalInitialState = {
		show: false,
		productName: '',
		productID: '',
	};
	const [show, setShow] = useState(modalInitialState);

	const handleClose = () => setShow(modalInitialState);
	const handleModal = (productName, productID) => {
		setShow({ show: true, productName, productID });
	};
	const [modalHL, setmodalHL] = useState(false);

	const deleteProduct = () => {
		const url = `products/delete/${show.productID}`;
		const urlGet = `business/${businessNameEncoded}`;
		const thenGetFunction = (response) => {
			setBusiness(response.data.business);
			setShow(modalInitialState);
		};
		const thenFunction = (response) => {
			getAPI(urlGet, thenGetFunction, errorFunction);
		};
		const errorFunction = (error) => {
			toastifyError(error.response.data.message);
		};
		deleteAPI(url, thenFunction, errorFunction);
	};

	const handleSavedProductStatus = (productID) => {
		const url = `users/savedProduct/${user._id}`;
		const requestBody = {
			productID: productID,
		};
		const thenFunction = (response) => {
			setUserSaved(response.data);
		};
		const errorFunction = (error) => {
			console.log(error);
		};
		putAPI(url, requestBody, thenFunction, errorFunction);
	};

	const handleSavedBusinessStatus = (businessID) => {
		const url = `users/savedBusiness/${user._id}`;
		const requestBody = {
			businessID: businessID,
		};
		const thenFunction = (response) => {
			setUserSaved(response.data);
		};
		const errorFunction = (error) => {
			console.log(error);
		};
		putAPI(url, requestBody, thenFunction, errorFunction);
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

	useEffect(() => {
		if (user) {
			const url = `users/saved/${user._id}`;
			const thenFunction = (response) => {
				setUserSaved(response.data);
			};
			const errorFunction = (error) => {
				console.log(error);
			};
			getAPI(url, thenFunction, errorFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (business !== '') {
		let owner = false;
		const businessStored = localStorage.getItem('businesses')
			? JSON.parse(localStorage.getItem('businesses'))
			: [];
		if (!businessStored.includes(business._id)) {
			localStorage.setItem(
				'businesses',
				JSON.stringify([...businessStored, business._id])
			);
		}
		if (user) {
			owner = business.owner === user._id ? true : false;
			putAPI(`users/visitedBusiness/${user._id}`, businessStored);
		}
		const currency = business.currency;

		const limitHL = owner
			? business.membership.plan === 'free'
				? 3
				: business.membership === 'basic'
				? 10
				: Infinity
			: null;

		const handleHighlightedProduct = (productID) => {
			if (
				business.highlightedProducts.includes(productID) ||
				business.highlightedProducts.length < limitHL
			) {
				const url = `business/highlightedProducts/${business._id}`;
				const requestBody = {
					productID: productID,
				};
				const thenFunction = (response) => {
					setBusiness(response.data);
				};
				const errorFunction = (error) => {
					console.log(error);
				};
				putAPI(url, requestBody, thenFunction, errorFunction);
			} else {
				setmodalHL(true);
			}
		};

		const businessHighlightedProducts = {
			highlightedProducts: business.highlightedProducts,
			handleHighlightedProduct: handleHighlightedProduct,
		};

		return (
			<div className={`container-fluid pb-3`}>
				<div className='row p-0'>
					<div
						className='d-flex flex-column align-items-center justify-content-between'
						style={{
							backgroundImage: `url('${business.bgUrl}')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							height: '150px',
						}}
					>
						<div className='d-flex col-12 justify-content-start'></div>
						<div className='d-flex justify-content-center align-items-end'>
							<Link
								to={`/${businessNameEncoded}/dashboard`}
								className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center'
								style={{
									height: '90px',
									width: '90px',
								}}
							>
								<img src={business.logoUrl} alt='altLogo' width={65} />
							</Link>
						</div>
					</div>
				</div>
				<div className='d-flex p-0'>
					<div className='business-products flex-grow-1'>
						<div className='row p-0'>
							<div className='d-flex flex-column justify-content-center align-items-center'>
								<div className='d-flex'>
									<Link
										to={`/${businessNameEncoded}/dashboard`}
										className='text-danger foodie-title h1'
									>
										{business.name}
									</Link>
									<span
										className='business-saved-icon my-2 mx-4'
										onClick={() =>
											userSaved !== '' ?
											handleSavedBusinessStatus(business._id):
											navigate('/login')
										}
									>
										{user !== undefined &&
										userSaved.savedBusiness?.includes(business._id)
											? '❤'
											: '🖤'}
									</span>
								</div>
								<BusinessMenu
									handleCategory={handleCategory}
									category={category}
									arrCategories={arrCategories}
									isDark={isDark}
								/>
							</div>
						</div>
						<div className='row p-0 justify-content-center'>
							<div className='col-11 pb-5 d-flex flex-wrap justify-content-around align-items-stretch '>
								{business.products
									.filter((prod) => prod.categories.includes(category))
									.map((product) => {
										return (
											<ProductCard2
												key={uuidv4()}
												product={product}
												businessNameEncoded={businessNameEncoded}
												currency={currency}
												cart={cart}
												setBusiness={setBusiness}
												handleModal={handleModal}
												owner={owner}
												userSaved={userSaved}
												handleSavedProductStatus={handleSavedProductStatus}
												businessHighlightedProducts={
													businessHighlightedProducts
												}
											/>
										);
									})}
							</div>
						</div>
					</div>
					{window.innerWidth > 750 && (
						<div className='mt-4'>
							<PromotionBanner
								maxHeight={true}
								business={business}
								currency={currency}
								lang={lang}
								businessHighlightedProducts={businessHighlightedProducts}
							/>
						</div>
					)}
				</div>

				{cart && user && cart.length > 0 && (
					<CartBanner
						cart={cart}
						user={user}
						summary={summary}
						currency={currency}
						lang={lang}
					/>
				)}
				<Modal
					show={show.show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].business.mTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{`${languages[0][lang].business.mBody1} "${show.productName}" ${languages[0][lang].business.mbody2}`}{' '}
						<br />
						{languages[0][lang].business.mBody3}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							{languages[0][lang].business.btnCancel}
						</Button>
						<Button variant='danger' onClick={deleteProduct}>
							{languages[0][lang].business.btnDelete}
						</Button>
					</Modal.Footer>
				</Modal>
				{/* MODAL FOR LIMIT HIGHLIGHTED */}
				<Modal
					show={modalHL}
					onHide={() => setmodalHL(false)}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].business.mHLtitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{`${languages[0][lang].business.mHLtext1} (${limitHL}).`} <br />
						{languages[0][lang].business.mHLtext2}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={() => setmodalHL(false)}>
							{languages[0][lang].business.btnCancel}
						</Button>
						<Button
							variant='danger'
							onClick={() => {
								navigate(`/${businessNameEncoded}/memberships`);
							}}
						>
							{languages[0][lang].business.btnMembership}
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

export default Business;
