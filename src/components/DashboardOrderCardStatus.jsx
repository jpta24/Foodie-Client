import { v4 as uuidv4 } from 'uuid';

const DashboardOrderCardStatus = ({ statues, status, setStatus }) => {
	const active = 'bg-danger text-bg-secondary';
	const inactive = 'bg-light text-bg-info';

	return (
		<div
			className='col-12 d-flex flex-wrap justify-content-around'
			style={{ height: '61px' }}
		>
			{statues.map((cat) => {
				return (
					<span
						style={{ cursor: 'pointer' }}
						key={uuidv4()}
						name={cat}
						className={`badge col-3 border border-dark my-1 mx-1 ${
							status === cat ? active : inactive
						}`}
						onClick={() => setStatus(cat)}
					>
						{cat}
					</span>
				);
			})}
		</div>
	);
};

export default DashboardOrderCardStatus;
