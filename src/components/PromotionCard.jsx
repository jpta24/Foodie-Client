import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';
import { useNavigate, Link } from 'react-router-dom';

import { handleAddToCart } from '../utils/functions';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function PromotionCard({ product, currency, dnd = false }) {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { getCartData, cart } = useContext(CartContext);

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: product._id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return !dnd ? (
		<div className='promotion-card d-flex my-3 mx-2'>
			<Link
				to={`/product/${product._id}`}
				className='promotion-card-img-container mx-3 my-auto col-5'
			>
				<img
					className='promotion-card-img'
					src={product.mainImg}
					alt='Product'
					loading='lazy'
				/>
			</Link>

			<span className='card-hl-icon'>🔥</span>
			<div className='promotion-card-section col-7 p-3 ps-0 text-start'>
				<span className='card-title-promo'>{product.name}</span>
				<p className='promotion-card-text-desc my-1'>{product.description}</p>
				<div className='my-1'>
					<span className='card-weigth'>
						{product.weight ? `${product.weight}g` : '290g'}
					</span>
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
	) : (
		<div
			style={style}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className='promotion-card d-flex my-3 mx-2'
		>
			<div className='promotion-card-img-container mx-3 my-auto col-5'>
				<img
					className='promotion-card-img'
					src={product.mainImg}
					alt='Product'
					loading='lazy'
				/>
			</div>

			<span className='card-hl-icon'>🔥</span>
			<div className='promotion-card-section col-7 p-3 ps-0 text-start'>
				<span className='card-title-promo'>{product.name}</span>
				<p className='promotion-card-text-desc my-1'>{product.description}</p>
				<div className='my-1'>
					<span className='card-weigth'>
						{product.weight ? `${product.weight}g` : '290g'}
					</span>
				</div>
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2)}
					</span>

					<span className='card-add'>➕</span>
				</div>
			</div>
		</div>
	);
}

export default PromotionCard;
