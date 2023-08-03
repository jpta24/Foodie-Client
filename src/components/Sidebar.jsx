import React from 'react';

import iconsCloud from '../data/icons.json';

const Sidebar = () => {
	const buzList = [
		{ icon: 'icon1', field: 'Dashboard' },
		{ icon: 'icon1', field: 'Store' },
		{ icon: 'icon1', field: 'Membership' },
		{ icon: 'icon1', field: 'Orders' },
		{ icon: 'icon1', field: 'Products' },
		{ icon: 'icon1', field: 'Employees' },
		{ icon: 'icon1', field: 'Billing' }
	];
    const personalList = [
		{ icon: 'icon1', field: 'Dashboard' },
		{ icon: 'icon1', field: 'Profile' },
		{ icon: 'icon1', field: 'Cart' },
		{ icon: 'icon1', field: 'Orders' },
		{ icon: 'icon1', field: 'Saved Stores' },
		{ icon: 'icon1', field: 'Saved Items' }
	];
	return (
		<div className='sidebar-container d-flex flex-column border'>
			<div className='d-flex flex-column justify-content-center align-items-center border'>
				Business
				<div className='d-flex flex-column justify-content-center align-items-start col-10'>
					<div
						className='rounded-circle border align-self-center border-dark bg-dark d-flex justify-content-center align-items-center'
						style={{
							height: '60px',
							width: '60px',
						}}
					>
						<img src={iconsCloud[0].foodieIcon} alt='altLogo' width={40} />
					</div>
                    
                    {buzList.map((elem)=>{
                        return(
                            <div className='py-2'>
                                <span>{elem.icon}</span>
                                <span>{elem.field}</span>
                            </div>
                        )
                    })}
				</div>
			</div>
			<div className='d-flex flex-column justify-content-center align-items-center'>
				Personal
			</div>
		</div>
	);
};

export default Sidebar;
