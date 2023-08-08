import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import policy from '../data/policies.json';

const PrivatePolicyPage = () => {
	const { language: lang } = useContext(AuthContext);
	return (
		<div className='container-fluid  content-container'>
			<div className='text-start my-5 mx-auto col-md-8 col-10'>
				<h1 className='my-4'>{policy[0][lang].privacy.title}</h1>
				<p>{policy[0][lang].privacy.intro}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.collectTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.collectText}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.useTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.useText}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.disclosureTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.disclosureText}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.securityTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.securityText}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.thirdTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.thirdText}</p>
				<hr />
				<h2 className='my-4'>{policy[0][lang].privacy.changeTitle}</h2>
				<p className='ms-5'>{policy[0][lang].privacy.changeText}</p>
				<hr />
				<p className='m-5'>{policy[0][lang].privacy.footText}</p>
				<h4 className='m-5'>{policy[0][lang].privacy.lastChange} 31/07/2023</h4>
			</div>
		</div>
	);
};

export default PrivatePolicyPage;
