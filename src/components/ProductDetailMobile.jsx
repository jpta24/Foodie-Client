import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';

const ProductDetailMobile = ({
	product,
	userSaved,
	handleSavedProductStatus,
	isProdSaved,
	rating,
	lang,
}) => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='detail-image-container d-flex justify-content-center align-items-center position-relative'>
					<Link to={`/${product.business.name}`} className='detail-close'>
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
						<img className='detail-img' src={product.mainImg} alt='' />
					</div>
					{/* <div
            className='rounded-circle border border-dark mb-3 mx-auto shadow'
            style={{
              height: '300px',
              width: '300px',
              backgroundImage: `url('${product.mainImg}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div> */}
				</div>
				<div className='col-lg-5 order-lg-1 text-start px-5 '>
					<div className=' col-12 d-flex justify-content-between position-relative'>
						<h1 className='mt-lg-5 mb-2'>{product.name}</h1>
						<span
							className='card-icon card-icon2 mt-lg-5'
							onClick={() =>
								// console.log('hier')
								userSaved !== '' && handleSavedProductStatus(product._id)
							}
						>
							{isProdSaved ? '❤' : '🖤'}
						</span>
					</div>
					<h5 className='my-2'>Rating: {rating}</h5>
					<p className='my-3'>{product.description}</p>
					<h6>{languages[0][lang].productDetails.ingredients}</h6>
					<div className='p-2 col-12 d-flex flex-row mb-3'>
						{product.ingredients.map((cat) => {
							return (
								<span
									key={uuidv4()}
									name={cat}
									className='badge rounded-pill bg-danger m-1'
								>
									{cat}
								</span>
							);
						})}
					</div>
					<h2 className='mb-3'>
						{product.business.currency} {product.price.toFixed(2)}
					</h2>
					<div className='bg-primary col-lg-7 col-9 px-2 py-2 text-center rounded-pill my-3'>
						{languages[0][lang].productDetails.addToCart}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailMobile;
