import { v4 as uuidv4 } from 'uuid';

const BusinessMenu = ({ handleCategory, category, arrCategories, isDark }) => {
	const active = 'bg-secondary text-bg-secondary';
	const inactive = 'bg-light text-bg-info';

	return (
		<div
			className={`${
				!isDark ? 'border' : ''
			} d-flex flex-row categories justify-content-center`}
		>
			<div className='scroll-container col-12 col-md-8'>
				{' '}
				{arrCategories.map((cat) => {
					return (
						<span
							style={{ cursor: 'pointer' }}
							key={uuidv4()}
							name={cat}
							className={`badge border border-dark my-1 mx-2 ${
								category === cat ? active : inactive
							}`}
							onClick={() => handleCategory(cat)}
						>
							{cat}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default BusinessMenu;
