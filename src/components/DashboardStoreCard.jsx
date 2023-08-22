import { Link } from 'react-router-dom';

const DashboardStoreCard = ({business}) => {
  return (
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
					height: '60px',
				}}
			>
				<div className='d-flex col-12 justify-content-start'>
					<h5 className='bg-light bg-opacity-50 mx-auto rounded px-2 text-danger'>
						{business.name}
					</h5>
				</div>
			</div>
		</Link>
  )
}

export default DashboardStoreCard