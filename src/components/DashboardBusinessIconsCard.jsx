import React from 'react';

const DashboardBusinessIconsCard = ({ title, icons, number, currency }) => {
	return (
        // <div className='border col-md-9'>
        //     <div className=''>{title}</div>
		// // 	<div className=''>{icons}</div>
		// // 	<div className=''></div>
        // </div>
		<div className='dashboard-order-card-container mx-auto py-1 my-1 col-4 col-md-9'>
			<div className='h5 pt-3 mb-0'>{title}</div>
			<div className='my-2'>{icons}</div>
			<div className='col-12 h6 mb-2'>
				{title === 'Sales' ? `${currency}${number.toFixed(2)}` : number}
			</div>
		</div>
	);
};

export default DashboardBusinessIconsCard;
