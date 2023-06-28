import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';

import { handleAddToCart } from "../utils/functions";

function PromotionCard({
	product,
	businessNameEncoded,
	currency,
	cart,
	setBusiness,
	handleModal,
	owner,
}) {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { getCartData } = useContext(CartContext);

	// const handleAddQtyToCart = () => {
	// 	const requestBody = {
	// 		cart: {
	// 			product: product._id,
	// 		},
	// 	};
	// 	const url = `users/addQtyCart/${user._id}`;
	// 	const thenFunction = (response) => {
	// 		getCartData();
	// 	};
	// 	putAPI(url, requestBody, thenFunction);
	// };

	// const handleAddToCart = () => {
	// 	if (user) {
	// 		if (cart.map((prod) => prod.product._id).includes(product._id)) {
	// 			handleAddQtyToCart();
	// 		} else {
	// 			const requestBody = {
	// 				cart: {
	// 					product: product._id,
	// 					quantity: 1,
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
	return (
		<div className='promotion-card d-flex my-3 mx-2'>
			<div className='promotion-card-img-container mx-3 my-auto col-5'>
				<img className='promotion-card-img' src={product.mainImg} alt='' />
			</div>
			<span className='card-hl-icon'>🔥</span>
			<div className='promotion-card-section col-7 p-3 ps-0 text-start'>
				<span className='card-title'>{product.name}</span>
				<p className='promotion-card-text-desc my-1'>{product.description}</p>
				<div className='my-1'>
					<span className='card-weigth'>290g</span>
				</div>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2)}
					</span>

					<span className='card-add' onClick={()=>{handleAddToCart(product,1,user,getCartData,cart,navigate)}}>
						➕
					</span>
				</div>
			</div>
		</div>
	);
}

export default PromotionCard;
