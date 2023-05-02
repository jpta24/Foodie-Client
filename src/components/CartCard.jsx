import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';

import { putAPI } from '../utils/api';

const CartCard = ({ product, updateSummary, currency }) => {
	const { user } = useContext(AuthContext);
	const { getCartData } = useContext(CartContext);
	// const handleAddToCart = () =>{
	//     const requestBody = {
	//         cart:{
	//             product:product.product._id,
	//             quantity:1
	//         }
	//     }
	//     axios
	//         .put(`${process.env.REACT_APP_SERVER_URL}/users/addCart/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
	//         .then(() => {
	//             getCartData()
	//         })
	//         .catch((error) => {
	//             console.log(error)
	//         });
	// }
	const handleAddQtyToCart = () => {
		const requestBody = {
			cart: {
				product: product.product._id,
			},
		};

		const url = `users/addQtyCart/${user._id}`;
		const thenFunction = (response) => {
			getCartData();
		};
		putAPI(url, requestBody, thenFunction);
	};

	const handleRemoveToCart = () => {
		const requestBody = {
			product: product._id,
		};
		const url = `users/removeCart/${user._id}`;
		const thenFunction = (response) => {
			getCartData();
		};
		putAPI(url, requestBody, thenFunction);
	};
	const handleRemoveQtyToCart = () => {
		const requestBody = {
			cart: {
				product: product.product._id,
			},
		};
		const url = `users/removeQtyCart/${user._id}`;
		const thenFunction = (response) => {
			getCartData();
		};
		putAPI(url, requestBody, thenFunction);
	};

	useEffect(() => {
		updateSummary();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='rounded d-flex flex-row card col-11 my-2 mx-auto align-items-center justify-content-between shadow'>
			<div className='col-2 m-2 '>
				<div
					className='p-2 rounded border border-dark d-flex justify-items-center m-auto'
					style={{
						height: '60px',
						width: '60px',
						backgroundImage: `url('${product.product.mainImg}')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				></div>
			</div>
			<div className='p-1 col-5 d-flex flex-column justify-content-between'>
				<dir className='p-0 m-1'>
					<p
						className='p-1 m-0 text-start'
						style={{ fontSize: '0.95em', fontWeight: 'bolder' }}
					>
						{product.product.name}
					</p>
					<p className='text-bold m-0 text-start'>
						{currency} {product.product.price.toFixed(2)}
					</p>
				</dir>
				<div className='mb-1'>
					<p className='mb-1'>
						<span
							style={{ cursor: 'pointer' }}
							className='badge rounded-pill bg-success'
						>
							<span
								className='p-1'
								onClick={() => {
									product.quantity === 1
										? handleRemoveToCart()
										: handleRemoveQtyToCart();
								}}
							>
								-
							</span>
							<span className='p-1'>{product.quantity}</span>
							<span
								className='p-1'
								onClick={() => {
									handleAddQtyToCart();
								}}
							>
								+
							</span>
						</span>
					</p>
				</div>
			</div>
			<div className='m-1 col-1'>
				<h3>{product.quantity}</h3>
			</div>
			<div className='m-1 col-3'>
				<h3 className='subtotal fs-4'>
					{currency} {(product.quantity * product.product.price).toFixed(2)}
				</h3>
			</div>
		</div>
	);
};

export default CartCard;
