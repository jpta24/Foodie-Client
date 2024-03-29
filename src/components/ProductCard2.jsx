import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { Link, useNavigate } from 'react-router-dom';

import { getAPI, putAPI } from '../utils/api';
import { handleAddToCart } from '../utils/functions';
import { toastifyError } from '../utils/tostify';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ProductCard2 = ({
	product,
	businessNameEncoded,
	currency,
	cart,
	setBusiness,
	handleModal,
	owner,
	userSaved,
	handleSavedProductStatus,
	businessHighlightedProducts,
	dnd = false,
}) => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { getCartData } = useContext(CartContext);

	const prodIsActive = product.status === 'paused' ? false : true;
	const paused = '⏸';
	const play = '▶';

	// const handleAddQtyToCart = (qty=1) => {
	// 	const requestBody = {
	// 		cart: {
	// 			product: product._id,
	// 			quantity: qty,
	// 		},
	// 	};
	// 	const url = `users/addQtyCart/${user._id}`;
	// 	const thenFunction = (response) => {
	// 		getCartData();
	// 	};
	// 	putAPI(url, requestBody, thenFunction);
	// };

	// const handleAddToCart = (qty=1) => {
	// 	if (user) {
	// 		if (cart.map((prod) => prod.product._id).includes(product._id)) {
	// 			handleAddQtyToCart(qty);
	// 		} else {
	// 			const requestBody = {
	// 				cart: {
	// 					product: product._id,
	// 					quantity: qty,
	// 				},
	// 			};
	// 			const url = `users/addCart/${user._id}`;
	// 			const thenFunction = (response) => {
	// 				getCartData();
	// 			};
	// 			const errorFunction = (error) => {
	// 				toastifyError(error.response.data.message);
	// 			};
	// 			putAPI(url, requestBody, thenFunction, errorFunction);
	// 		}
	// 	} else {
	// 		navigate(`/login/${businessNameEncoded}`);
	// 	}
	// };

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

	const isProdSaved =
		userSaved.savedProducts === undefined
			? false
			: userSaved.savedProducts?.includes(product._id);

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: product._id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	// console.log(product._id)
	return !dnd ? (
		<div
			className={`mx-1 my-1 card-container ${
				!prodIsActive ? 'opacity-50' : ''
			}`}
		>
			<dir className='p-0 m-1 card-controls'>
				<div className={`p-0 m-0 ${owner === false ? 'd-none' : ''} text-end`}>
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
			{businessHighlightedProducts.highlightedProducts?.includes(
				product._id
			) ? (
				<span
					className='card-icon card-icon1'
					onClick={() => {
						owner &&
							businessHighlightedProducts.handleHighlightedProduct(product._id);
					}}
				>
					🔥
				</span>
			) : (
				owner && (
					<span
						className='card-icon card-icon1'
						onClick={() => {
							owner &&
								businessHighlightedProducts.handleHighlightedProduct(
									product._id
								);
						}}
					></span>
				)
			)}
			<span
				className='card-icon card-icon2'
				onClick={() =>
					userSaved !== ''
						? handleSavedProductStatus(product._id)
						: navigate('/login')
				}
			>
				{isProdSaved ? '❤' : '🖤'}
			</span>
			<Link to={`/product/${product._id}`}>
				<div className='card-img-container'>
					<img
						className='card-img'
						src={product.mainImg}
						alt='Product'
						loading='lazy'
					/>
				</div>
			</Link>

			<div className='card-section p-3 text-start'>
				<span className='card-title'>{product.name}</span>
				<p className='card-text-desc'>{product.description}</p>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2).length < 8
							? product.price.toFixed(2)
							: product.price.toFixed(2).slice(0, 6) + '...'}
					</span>
					<div className='my-auto'>
						<span className='card-weigth'>
							{product.weight ? `${product.weight}g` : '290g'}
						</span>
					</div>
					<span
						className='card-add'
						onClick={() => {
							handleAddToCart(product, 1, user, getCartData, cart, navigate);
						}}
					>
						➕
					</span>
				</div>
			</div>
		</div>
	) : (
		<div
			style={style}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={`mx-1 my-1 card-container ${
				!prodIsActive ? 'opacity-50' : ''
			}`}
		>
			{businessHighlightedProducts.highlightedProducts?.includes(
				product._id
			) ? (
				<span className='card-icon card-icon1'>🔥</span>
			) : (
				owner && <span className='card-icon card-icon1'></span>
			)}
			<span className='card-icon card-icon2'>{isProdSaved ? '❤' : '🖤'}</span>
			<div>
				<div className='card-img-container'>
					<img
						className='card-img'
						src={product.mainImg}
						alt='Product'
						loading='lazy'
					/>
				</div>
			</div>

			<div className='card-section p-3 text-start'>
				<span className='card-title'>{product.name}</span>
				<p className='card-text-desc'>{product.description}</p>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2).length < 8
							? product.price.toFixed(2)
							: product.price.toFixed(2).slice(0, 6) + '...'}
					</span>
					<div className='my-auto'>
						<span className='card-weigth'>
							{product.weight ? `${product.weight}g` : '290g'}
						</span>
					</div>
					<span className='card-add'>➕</span>
				</div>
			</div>
		</div>
	);
};
export default ProductCard2;
