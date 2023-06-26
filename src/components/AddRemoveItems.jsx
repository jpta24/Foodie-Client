import React from 'react';

const AddRemoveItems = ({ product,setProduct }) => {
	return (
		<div className='mb-1 col-6'>
        <h1>
			<span
				style={{ cursor: 'pointer' }}
				className='badge badge-lg rounded-pill bg-dark'
			>
				<span
					className='p-1 mx-1'
					onClick={() => {
						product.qty !== 0 && setProduct({...product, qty:product.qty - 1});
					}}
				>
					-
				</span>
				<span className='p-1 mx-1'>{product.qty}</span>
				<span
					className='p-1 mx-1'
					onClick={() => {
						setProduct({...product, qty:product.qty + 1});
					}}
				>
					+
				</span>
			</span>
            </h1>
		</div>
	);
};

export default AddRemoveItems;
