import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Button } from 'react-bootstrap';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';

const OrderCard = ({ order, handleCancelOrder, handleModal }) => {
	const { language: lang } = useContext(AuthContext);

	return (
		<div className='rounded d-flex flex-row card col-11 align-items-center justify-content-around m-1 shadow bg-dark text-light'>
			<div className='col-md-1 d-none d-md-block m-1 '>
				<div
					className='d-none d-md-block p-2 rounded border border-dark d-flex justify-items-center m-auto'
					style={{
						height: '60px',
						width: '60px',
						backgroundImage: `url('${order.business.logoUrl}')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				></div>
			</div>
			<div className='p-1 col-11 col-md-10 d-flex flex-column justify-content-between'>
				<dir className='p-1 m-1'>
					{window.innerWidth > 750 ? (
						<p
							className='p-1 m-0 text-start d-flex justify-content-between'
							style={{ fontSize: '0.95em', fontWeight: 'bolder' }}
						>
							<span>
								{`${languages[0][lang].orderCard.business}: ${order.business.name}  /  ${languages[0][lang].orderCard.phone}: ${order.note.phone}`}
							</span>
							<span>
								{languages[0][lang].orderCard.order}{' '}
								{order._id.slice(10).toUpperCase()}
							</span>{' '}
						</p>
					) : (
						<p className='p-1 m-0 text-start d-flex justify-content-between'>
							{' '}
							<span className='d-flex flex-column justify-content-start'>
								<span>{languages[0][lang].orderCard.business}:</span>
								<span style={{ fontSize: '0.95em', fontWeight: 'bolder' }}>
									{order.business.name}
								</span>
								<span>{languages[0][lang].orderCard.phone}:</span>
								<span style={{ fontSize: '0.95em', fontWeight: 'bolder' }}>
									{order.note.phone}
								</span>
							</span>
							<span className='d-flex flex-column justify-content-start'>
								<span>{languages[0][lang].orderCard.order}:</span>
								<span style={{ fontSize: '0.95em', fontWeight: 'bolder' }}>
									{order._id.slice(10).toUpperCase()}
								</span>
							</span>
						</p>
					)}
					<div className='p-1'>
						{order.products.map((eachProduct) => {
							return (
								eachProduct.product !== null && (
									<p
										key={uuidv4()}
										className='m-0 text-start d-flex justify-content-between'
									>
										<span className='col-8'>{`- (${eachProduct.quantity}) ${eachProduct.product.name}`}</span>
										<span>
											{order.business.currency}{' '}
											{(
												(eachProduct.price || eachProduct.product.price) * eachProduct.quantity
											).toFixed(2)}
										</span>
									</p>
								)
							);
						})}
					</div>
					<hr />
					<p className='m-0 text-start d-flex flex-wrap justify-content-between'>
						<span>
							{languages[0][lang].orderCard.name}: {order.note.name}
						</span>
						<span>
							{languages[0][lang].orderCard.phone}: {order.note.phone}
						</span>
					</p>
					{order.note.street && (
						<p className='m-0 text-start'>
							{languages[0][lang].orderCard.address} {order.note.street}
						</p>
					)}
					{order.note.note && (
						<p className='text-bold m-0 text-start'>
							{languages[0][lang].orderCard.note} {order.note.note}
						</p>
					)}
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].orderCard.delivery} {order.format}
					</p>
					<hr />
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].orderCard.summary} {order.business.currency}{' '}
						{order.summary.toFixed(2)}
					</p>
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].orderCard.paymentMethod}{' '}
						<span className='text-bold'>{order.paymentMethod}</span>
					</p>
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].orderCard.status} {order.status}
					</p>
					<div className='col-12 d-flex flex-row flex-wrap justify-content-around'>
						{order.status === 'pending' && (
							<Button
								variant='outline-success'
								size='sm'
								className='py-0 m-1 col-md-2'
								onClick={() => handleCancelOrder(order)}
							>
								{languages[0][lang].orderCard.cancel}
							</Button>
						)}

						<Button
							variant='outline-secondary'
							size='sm'
							className='py-0 m-1 col-md-2'
							onClick={() =>
								handleModal('Please contact seller to:', order, 'seller')
							}
						>
							{languages[0][lang].orderCard.contact}
						</Button>
						<Button
							variant='outline-secondary'
							size='sm'
							className='py-0 m-1 col-md-2'
							onClick={() =>
								handleModal(
									'Please send an email to: info@foodys.app',
									order,
									'us'
								)
							}
						>
							{languages[0][lang].orderCard.contactus}
						</Button>
					</div>
				</dir>
			</div>
		</div>
	);
};

export default OrderCard;
