import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import AddRemoveItems from './AddRemoveItems';
import RatingProd from './RatingProd';
import ProdDetailsExpandText from './ProdDetailsExpandText';
import CartBanner from './CartBanner';

const ProductDetailMobile = ({
	product,
	setProduct,
	userSaved,
	handleSavedProductStatus,
	isProdSaved,
	rating,
	lang,
	handleAddToCart,
	user,
	getCartData,
	cart,
	navigate,
    summary,
    currency
}) => {
	return (
		<div className='container pb-5'>
			<div className='row'>
				<div className='detail-image-container d-flex flex-column justify-content-around align-items-center position-relative'>
					<Link
						to={`/${product.product.business.name}`}
						className='detail-close'
					>
						<IoCloseSharp />
					</Link>
					<div className='detail-bg-img-container position-absolute'>
						<img
							className='detail-bg-img'
							src={iconsCloud[0].detailsBg}
							alt=''
						/>
					</div>
					<div className='detail-img-container rounded-circle'>
						<img className='detail-img' src={product.product.mainImg} alt='' />
					</div>
					<AddRemoveItems product={product} setProduct={setProduct} />
				</div>
				<div className='text-start px-5 '>
					<div className='d-flex justify-content-between mt-4 position-relative'>
						<h1 className='mb-2 pe-4'>
							{product.product.name.length < 41
								? product.product.name
								: product.product.name.slice(0, 35) + '...'}
						</h1>
						<span
							className='card-icon card-icon2'
							onClick={() =>
								userSaved !== '' &&
								handleSavedProductStatus(product.product._id)
							}
						>
							{isProdSaved ? '❤' : '🖤'}
						</span>
					</div>
					<div className='my-2 fs-6 text-secondary d-flex'>
						Rating: <RatingProd rating={rating} />{' '}
					</div>
					<ProdDetailsExpandText
						text={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor feugiat odio, ut tincidunt mi pellentesque in. Suspendisse potenti. asdasdas sdadsdasd asñklnaskldnas mas slmclkas dlas m slmsaldknal asdlamsldkas alsdmañlmdalñ'
						}
					/>
					<h6 className='my-1'>{languages[0][lang].productDetails.ingredients}</h6>
					<div className='px-2 col-12 d-flex flex-row mb categories'>
						{product.product.ingredients.map((cat) => {
							return (
								<span
									key={uuidv4()}
									name={cat}
									className='badge rounded-pill m-1'
									style={{ backgroundColor: 'red' }}
								>
									{cat}
								</span>
							);
						})}
					</div>
					<div className='d-flex justify-content-between'>
						<h2 className='py-3 mx-2'>
							{product.product.business.currency}{' '}
							{product.product.price.toFixed(2).length < 9
								? product.product.price.toFixed(2)
								: product.product.price.toFixed(2).slice(0, 6) + '...'}
						</h2>
						<div
							className='bg-primary col-lg-7 col-6 px-2 py-2 text-center rounded-pill my-3'
							onClick={() => {
								handleAddToCart(product.product, product.qty, user, getCartData, cart, navigate);
							}}
						>
							{languages[0][lang].productDetails.addToCart}
						</div>
					</div>
				</div>
                {cart && user && cart.length > 0 && 
                    <CartBanner cart={cart} user={user} summary={summary} currency={currency} lang={lang}/>
				}
			</div>
		</div>
	);
};

export default ProductDetailMobile;
