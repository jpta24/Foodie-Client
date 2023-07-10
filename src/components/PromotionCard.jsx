import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { useNavigate, Link } from 'react-router-dom';

import { handleAddToCart } from '../utils/functions';

function PromotionCard({ product, currency }) {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { getCartData, cart } = useContext(CartContext);

	return (
		<div className='promotion-card d-flex my-3 mx-2'>
			<Link
				to={`/product/${product._id}`}
				className='promotion-card-img-container mx-3 my-auto col-5'
			>
				<img className='promotion-card-img' src={product.mainImg} alt='' />
			</Link>

			<span className='card-hl-icon'>🔥</span>
			<div className='promotion-card-section col-7 p-3 ps-0 text-start'>
				<span className='card-title'>{product.name}</span>
				<p className='promotion-card-text-desc my-1'>{product.description}</p>
				<div className='my-1'>
					<span className='card-weigth'>{product.weight ? `${product.weight}g`:'290g'}</span>
				</div>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2)}
					</span>

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
	);
}

export default PromotionCard;
