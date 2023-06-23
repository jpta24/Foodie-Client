import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { v4 as uuidv4 } from 'uuid';
import { IoCloseSharp } from 'react-icons/io5';

import languages from '../data/language.json';
import Loading from '../components/Loading';
import { getAPI, putAPI } from '../utils/api';
import iconsCloud from '../data/icons.json';
import ProductDetailMobile from '../components/ProductDetailMobile';

const ProductDetails = (props) => {
	const { language: lang, user } = useContext(AuthContext);

	const { productID } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const url = `products/${productID}`;
		const thenFunction = (response) => {
			setProduct({product:response.data.product,qty:1});
		};
		getAPI(url, thenFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [userSaved, setUserSaved] = useState('');
	let isProdSaved = false;

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

	if (userSaved) {
        console.log(userSaved);
		isProdSaved =
			userSaved.savedProducts === undefined
				? false
				: userSaved.savedProducts?.includes(product.product._id);
	}

	const rating = 4.5;

	if (product) {
		return (
			<>
				<ProductDetailMobile
					product={product}
                    setProduct={setProduct}
					userSaved={userSaved}
					handleSavedProductStatus={handleSavedProductStatus}
					isProdSaved={isProdSaved}
					rating={rating}
					lang={lang}
				/>
			</>
			// {/* <div className='container'>
			// 	<div className='row'>
			// 		<div className='col-lg-4 order-lg-2 d-flex flex-column justify-content-center align-items-center position-relative mb-3'>
			// 			<Link to={`/${product.business.name}`} className='detail-close'>
			// 				<IoCloseSharp />
			// 			</Link>
			//             <div className='detail-bg-img-container position-absolute'>
			//                 <img className='detail-bg-img' src={iconsCloud[0].detailsBg} alt="" />
			//             </div>
			// 			<div className='detail-img-container rounded-circle'>
			// 				<img className='detail-img' src={product.mainImg} alt='' />
			// 			</div>
			// 			{/* <div
			// 				className='rounded-circle border border-dark mb-3 mx-auto shadow'
			// 				style={{
			// 					height: '300px',
			// 					width: '300px',
			// 					backgroundImage: `url('${product.mainImg}')`,
			// 					backgroundPosition: 'center',
			// 					backgroundSize: 'cover',
			// 					backgroundRepeat: 'no-repeat',
			// 				}}
			// 			></div> */}
			// 		</div>
			// 		<div className='col-lg-5 order-lg-1 text-start px-5 '>
			// 			<div className=' col-12 d-flex justify-content-between position-relative'>
			// 				<h1 className='mt-lg-5 mb-2'>{product.name}</h1>
			// 				<span
			// 					className='card-icon card-icon2 mt-lg-5'
			// 					onClick={() =>
			// 						// console.log('hier')
			// 						userSaved !== '' && handleSavedProductStatus(product._id)
			// 					}
			// 				>
			// 					{isProdSaved ? '❤' : '🖤'}
			// 				</span>
			// 			</div>
			// 			<h5 className='my-2'>Rating: {rating}</h5>
			// 			<p className='my-3'>{product.description}</p>
			// 			<h6>{languages[0][lang].productDetails.ingredients}</h6>
			// 			<div className='p-2 col-12 d-flex flex-row mb-3'>
			// 				{product.ingredients.map((cat) => {
			// 					return (
			// 						<span
			// 							key={uuidv4()}
			// 							name={cat}
			// 							className='badge rounded-pill bg-danger m-1'
			// 						>
			// 							{cat}
			// 						</span>
			// 					);
			// 				})}
			// 			</div>
			// 			<h2 className='mb-3'>
			// 				{product.business.currency} {product.price.toFixed(2)}
			// 			</h2>
			// 			<div className='bg-primary col-lg-7 col-9 px-2 py-2 text-center rounded-pill my-3'>
			// 				{languages[0][lang].productDetails.addToCart}
			// 			</div>
			// 		</div>
			// 	</div>
			// </div> */}
		);
	} else {
		return (
			<div>
				<Loading />
			</div>
		);
	}
};

export default ProductDetails;
