import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import AddRemoveItems from './AddRemoveItems';
import RatingProd from './RatingProd';
import ProdDetailsExpandText from './ProdDetailsExpandText';
import CartBanner from './CartBanner';
import PromotionBanner from './PromotionBanner';

const ProductDetailDesktop = ({
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
	currency,
}) => {
	const handleHighlightedProduct = () => {
		return;
	};

	const businessHighlightedProducts = {
		highlightedProducts: product.product.business.highlightedProducts,
		handleHighlightedProduct: handleHighlightedProduct,
	};
	// console.log(window.innerHeight);
	// const nummm = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed'
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='d-flex'>
					<div className='d-flex flex-grow-1'>
						<div className='col-6'>
							<div className='text-start px-3 '>
								<div className='d-flex justify-content-between mt-4 position-relative py-4 col-12'>
									<h1 className='mb-2 pe-4'>
										{product.product.name.length < 60
											? product.product.name
											: product.product.name.slice(0, 60) + '...'}
									</h1>
									<span
										className='card-icon card-icon2 my-5'
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
										product.product.description
									}
								/>
								<h6 className='my-1'>
									{languages[0][lang].productDetails.ingredients}
								</h6>
								<div className='px-2 col-12 d-flex flex-row mb categories'>

								<div className='scroll-container col-12'>{product.product.ingredients.map((cat) => {
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
									})}</div>
									
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
											handleAddToCart(
												product.product,
												product.qty,
												user,
												getCartData,
												cart,
												navigate
											);
										}}
									>
										{languages[0][lang].productDetails.addToCart}
									</div>
								</div>
							</div>
						</div>
						<div className='col-6'>
							<div
								className='d-flex flex-column justify-content-around align-items-center position-relative'
								style={{ width: '100%', height: '100%', overflow: 'hidden' }}
							>
								<Link
									to={`/${product.product.business.name}`}
									className='detail-close'
								>
									<IoCloseSharp />
								</Link>
								<div className=''>
									<div className='detail-bg-img-container-d'>
										<img
											className='detail-bg-img-d'
											src={iconsCloud[0].detailsBg}
											alt=''
										/>
									</div>
								</div>

								<div className='detail-img-container rounded-circle my-4'>
									<img
										className='detail-img'
										src={product.product.mainImg}
										alt=''
									/>
								</div>
								<div className='mb-4'>
									<AddRemoveItems product={product} setProduct={setProduct} />
								</div>
							</div>
						</div>
					</div>

					{window.innerWidth > 1100 && (
						<PromotionBanner
							maxHeight={false}
							business={product.product.business}
							currency={currency}
							lang={lang}
							businessHighlightedProducts={businessHighlightedProducts}
						/>
					)}
				</div>
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
		</div>
	);
};

export default ProductDetailDesktop;
