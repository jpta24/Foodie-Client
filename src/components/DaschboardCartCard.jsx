import { Link, useNavigate } from 'react-router-dom';

const DaschboardCartCard = ({product,
    currency,
    userSaved,
    quantity}) => {
        const prodIsActive = product.status === 'paused' ? false : true;
  return (
    <div
			className={`mx-1 my-1 dashboard-cart-card-container ${
				!prodIsActive ? 'opacity-50' : ''
			}`}
		>
			<Link to={`/product/${product._id}`}>
				<div className='dashboard-cart-card-img-container'>
					<img
						className='card-img'
						src={product.mainImg}
						alt='Product'
						loading='lazy'
					/>
				</div>
			</Link>

			<div className='dashboard-cart-card-section p-3 text-start'>
				<span className='dashboard-cart-card-title'>{product.name}</span>
				{/* <p className='card-text-desc'>{product.description}</p> */}
				<div className='d-flex justify-content-between'>
					<span className='card-preis'>
						{currency}
						{product.price.toFixed(2).length < 8
							? product.price.toFixed(2)
							: product.price.toFixed(2).slice(0, 6) + '...'}
					</span>
					 <span className='card-add text-dark fs-6'>{quantity}</span>
				</div>
			</div>
		</div>
  )
}

export default DaschboardCartCard