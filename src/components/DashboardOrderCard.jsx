import { v4 as uuidv4 } from 'uuid';

const DashboardOrderCard = ({ order, dashboard }) => {
	return (
		<div className='d-flex col-11 mx-auto justify-content-between dashboard-order-card-container my-2'>
			<div className='d-flex flex-column'>
				<div
					className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center mx-2 my-1'
					style={{
						height: '60px',
						width: '60px',
					}}
				>
					<img
						src={
							dashboard === 'user'
								? order.business.logoUrl
								: order.user.avatarUrl ||
								  'https://cdn2.iconfinder.com/data/icons/user-23/512/User_Generic_1.png'
						}
						alt='altLogo'
						width={40}
					/>
				</div>
				<span className='text-center mb-2'>
					{order.status.charAt(0).toUpperCase() +
						order.status.slice(1).toLowerCase()}
				</span>
			</div>

			<div className='d-flex flex-column align-items-start justify-content-start flex-grow-1 my-1'>
				{dashboard === 'user' ? (
					<span
						className='foodie-title text-danger'
						style={{ fontSize: '20px' }}
					>
						{order.business.name}
					</span>
				) : (
					<span className='text-danger' style={{ fontSize: '16px', fontWeight:'bolder' }}>{order.note.name}</span>
				)}
				<div className='d-flex flex-column col-12'>
					{order.products.map((eachProduct) => {
						return (
							<p
								key={uuidv4()}
								className='m-0 text-start d-flex justify-content-between'
							>
								<span className='col-8'>{`- (${eachProduct.quantity}) ${eachProduct.product?.name}`}</span>
							</p>
						);
					})}
				</div>
			</div>
			<div className='d-flex flex-column mx-3 my-1 py-2 col-3 col-md-2'>
				<span style={{ fontSize: '9px' }} className=''>
					{order._id.slice(10).toUpperCase()}
				</span>
				<span className='h6 my-2 px-1 py-2 '>
					{order.business.currency} {order.summary.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default DashboardOrderCard;
