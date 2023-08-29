import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Button } from 'react-bootstrap';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';

const BusinessOrdersCard = ({ order, handleStatusOrder, handleModal }) => {
	const { language: lang } = useContext(AuthContext);
	return (
		<div className='rounded d-flex flex-row card col-11 align-items-center justify-content-around my-1 mx-auto shadow shadow bg-dark text-light'>
			<div className='col-md-1 d-none d-md-block m-1'>
				<div
					className='d-none d-md-block p-2 rounded border border-dark d-flex justify-items-center m-auto'
					style={{
						height: '60px',
						width: '60px',
						backgroundImage: `url('${
							order.user.avatarUrl ||
							'https://cdn2.iconfinder.com/data/icons/user-23/512/User_Generic_1.png'
						}')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				></div>
			</div>
			<div className='p-1 col-11 col-md-10 d-flex flex-column justify-content-between'>
				<dir className='p-1 m-1'>
					<p
						className='p-1 m-0 text-start d-flex justify-content-end'
						style={{ fontSize: '0.95em', fontWeight: 'bolder' }}
					>
						<span>
							{languages[0][lang].businessOrderCard.order}
							{': '}
							{order._id.slice(10).toUpperCase()}
						</span>
					</p>
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
												(eachProduct.price || eachProduct.product.price) *
												eachProduct.quantity
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
							{languages[0][lang].businessOrderCard.name}: {order.note.name}
						</span>
						<span>
							{languages[0][lang].businessOrderCard.phone}: {order.note.phone}
						</span>
					</p>
					{order.note.street && (
						<p className='m-0 text-start'>
							{languages[0][lang].businessOrderCard.address} {order.note.street}
						</p>
					)}
					{order.note.note && (
						<p className='text-bold m-0 text-start'>
							{languages[0][lang].businessOrderCard.note}: {order.note.note}
						</p>
					)}
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].businessOrderCard.delivery} {order.format}
					</p>
					<hr />
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].businessOrderCard.summary}{' '}
						{order.business.currency} {order.summary.toFixed(2)}
					</p>
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].businessOrderCard.paymentMethod}{' '}
						<span className='text-bold'>{order.paymentMethod}</span>
					</p>
					<p className='text-bold m-0 text-start'>
						{languages[0][lang].businessOrderCard.status} {order.status}
					</p>
					<div className='col-12 d-flex flex-row flex-wrap justify-content-around'>
						{order.status === 'pending' && (
							<>
								<Button
									variant='success'
									size='sm'
									className='py-0 m-1 col-md-2 col-5'
									onClick={() => handleStatusOrder(order, 'confirmed')}
								>
									{languages[0][lang].businessOrderCard.confirm}
								</Button>
								<Button
									variant='outline-success'
									size='sm'
									className='py-0 m-1 col-md-2 col-5'
									onClick={() => handleStatusOrder(order, 'cancelled')}
								>
									{languages[0][lang].businessOrderCard.cancel}
								</Button>
							</>
						)}

						<Button
							variant='outline-secondary'
							size='sm'
							className='py-0 m-1 col-md-2 col-5'
							onClick={() =>
								handleModal(
									'Please send an email to: info@foodys.app',
									order,
									'us'
								)
							}
						>
							{languages[0][lang].businessOrderCard.contactus}
						</Button>
						{/* <Button variant='outline-secondary' size='sm' className='py-0 m-1 col-md-2 col-5' onClick={()=>handleModal('Please send an email to: contact@foodys.app',order,'us')}>Contact Us</Button>
                        <Button variant='outline-secondary' size='sm' className='py-0 m-1 col-md-2 col-5' onClick={()=>handleModal('Please send an email to: contact@foodys.app',order,'us')}>Contact Us</Button> */}
					</div>
				</dir>
			</div>
		</div>
	);
};

export default BusinessOrdersCard;
