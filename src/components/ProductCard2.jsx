import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { Link, useNavigate } from 'react-router-dom';

import { getAPI, putAPI } from '../utils/api';
import { toastifyError } from '../utils/tostify';

import iconsCloud from '../data/icons.json';

const ProductCard2 = ({
	product,
	businessNameEncoded,
	currency,
	cart,
	setBusiness,
	handleModal,
	owner,
}) => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { getCartData } = useContext(CartContext);

	const prodIsActive = product.status === 'paused' ? false : true;
	const paused = '⏸';
	const play = '▶';

	const handleAddQtyToCart = () => {
		const requestBody = {
			cart: {
				product: product._id,
			},
		};
		const url = `users/addQtyCart/${user._id}`;
		const thenFunction = (response) => {
			getCartData();
		};
		putAPI(url, requestBody, thenFunction);
	};

	const handleAddToCart = () => {
		if (user) {
			if (cart.map((prod) => prod.product._id).includes(product._id)) {
				handleAddQtyToCart();
			} else {
				const requestBody = {
					cart: {
						product: product._id,
						quantity: 1,
					},
				};
				const url = `users/addCart/${user._id}`;
				const thenFunction = (response) => {
					getCartData();
				};
				const errorFunction = (error) => {
					toastifyError(error.response.data.message);
				};
				putAPI(url, requestBody, thenFunction, errorFunction);
			}
		} else {
			navigate(`/login/${businessNameEncoded}`);
		}
	};

	const handleProductStatus = () => {
		const newStatus = prodIsActive ? 'paused' : 'active';
		const requestBody = {
			status: newStatus,
		};
		const url = `products/status/${product._id}`;

		const urlGet = `business/${businessNameEncoded}`;
		const thenGetFunction = (response) => {
			setBusiness(response.data.business);
		};
		const thenFunction = (response) => {
			getAPI(urlGet, thenGetFunction, errorFunction);
		};
		const errorFunction = (error) => {
			toastifyError(error.response.data.message);
		};
		putAPI(url, requestBody, thenFunction, errorFunction);
	};
	return (
		<div className='m-3 card-container'>
			<dir className='p-0 m-1 card-controls'>
				<div className={`p-0 m-0 ${owner === false && 'd-none'} text-end`}>
					<span
						style={{ cursor: 'pointer' }}
						className='mx-1'
						onClick={handleProductStatus}
					>
						{prodIsActive ? paused : play}
					</span>
					<Link to={`/${businessNameEncoded}/edit-product/${product._id}`}>
						<span style={{ cursor: 'pointer' }} className='mx-1'>
							🖊
						</span>
					</Link>
					<span
						style={{ cursor: 'pointer' }}
						className='mx-1'
						onClick={() => {
							handleModal(product.name, product._id);
						}}
					>
						❌
					</span>
				</div>
			</dir>
			<span className='card-icon card-icon1'>🔥</span>
			<span className='card-icon card-icon2'>❤</span>
			<img
				className='card-img'
				src='https://res.cloudinary.com/dwtnqtdcs/image/upload/v1677588597/foodie-gallery/thhzch2ewid7p0kylsly.png'
				alt=''
			/>
			<div className='card-section p-3 text-start'>
				<span className='card-title'>Pizza Margarita</span>
				<p className='card-text-desc'>
					Smoked salmon, red caviar, boiled potatoes, boiled carrots, frozen
					green beans and salt.
				</p>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>$9</span>
					<div className='my-auto'>
						<span className='card-weigth'>290g</span>
					</div>
					<span className='card-add'>➕</span>
				</div>
			</div>
		</div>
	);
};
export default ProductCard2;
