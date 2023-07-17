import React from 'react';
import { Link } from 'react-router-dom';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const RedirectCard = ({ business, dnd = false }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: business._id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return !dnd ? (
		<Link
			className='card p-1 my-2 mx-auto rounded cardBg col-11'
			to={`/${business.name}`}
		>
			<div
				className='d-flex flex-column align-items-center justify-content-between rounded'
				style={{
					backgroundImage: `url('${business.bgUrl}')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '90px',
				}}
			>
				<div className='d-flex col-12 justify-content-start'>
					<h5 className='bg-light bg-opacity-50 mx-auto rounded px-2 text-danger'>
						{business.name}
					</h5>
				</div>
				<div className='d-flex justify-content-center align-items-end'>
					<div
						className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center'
						style={{
							height: '60px',
							width: '60px',
						}}
					>
						<img src={business.logoUrl} alt='altLogo' width={45} />
					</div>
				</div>
			</div>
		</Link>
	) : (
		<div
			style={style}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className='card p-1 my-2 mx-auto rounded cardBg col-11'
		>
			<div
				className='d-flex flex-column align-items-center justify-content-between rounded'
				style={{
					backgroundImage: `url('${business.bgUrl}')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '90px',
				}}
			>
				<div className='d-flex col-12 justify-content-start'>
					<h5 className='bg-light bg-opacity-50 mx-auto rounded px-2 text-danger'>
						{business.name}
					</h5>
				</div>
				<div className='d-flex justify-content-center align-items-end'>
					<div
						className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center'
						style={{
							height: '60px',
							width: '60px',
						}}
					>
						<img src={business.logoUrl} alt='altLogo' width={45} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RedirectCard;
