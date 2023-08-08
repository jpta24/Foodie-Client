import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import policy from '../data/policies.json';

const TermsPage = () => {
	const { language: lang } = useContext(AuthContext);
	return (
		<div className='container-fluid  content-container'>
			<div className='text-start my-5 mx-auto col-md-8 col-10'>
			<h1 className='my-4'>{policy[0][lang].terms.title}</h1>
			<p>{policy[0][lang].terms.intro}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.useTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.useText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.useText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.intellectualTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.intellectualText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.intellectualText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.rollsTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.rollsText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.rollsText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.limitsTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.limitsText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.limitsText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.qualityTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.qualityText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.qualityText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.returnsTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.returnsText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.returnsText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.paymentsTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.paymentsText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.paymentsText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.deliveriesTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.deliveriesText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.deliveriesText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.sanctionsTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.sanctionsText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.sanctionsText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.thirdTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.thirdText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.thirdText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.changesTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.changesText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.changesText2}</p>
			<hr />
			<h2 className='my-4'>{policy[0][lang].terms.lawTitle}</h2>
			<p className='ms-5'>{policy[0][lang].terms.lawText1}</p>
			<p className='ms-5'>{policy[0][lang].terms.lawText2}</p>
			<hr />
			<p className='m-5'>{policy[0][lang].terms.footer}</p>
			<h4 className='m-5'>{policy[0][lang].terms.thanks} </h4>
			</div>
		</div>
	);
};

export default TermsPage;
