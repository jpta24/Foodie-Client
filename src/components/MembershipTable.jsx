import { useContext } from 'react';
import MembershipCard from '../components/MembershipCard';
import { AuthContext } from '../context/auth.context';
import languages from '../data/language.json';

function MembershipTable({ btnFunction, business }) {
	const { language: lang } = useContext(AuthContext);
	
	console.log(business);
	return (
		<div>
			<h1 className='m-3'>{languages[0][lang].membership.title}</h1>
			{!business.membership.usedTrial && (
				<p>{languages[0][lang].membership.freeTrial}</p>
			)}
			<div className='d-flex justify-content-center flex-wrap align-items-center col-md-12 mx-auto'>
				<MembershipCard
					string={'free'}
					price={'-'}
					btnFunction={btnFunction}
					business={business}
				/>
				<MembershipCard
					string={'basic'}
					price={'$5'}
					btnFunction={btnFunction}
					business={business}
				/>
				<MembershipCard
					string={'premium'}
					price={'$10'}
					btnFunction={btnFunction}
					business={business}
				/>
			</div>
		</div>
	);
}

export default MembershipTable;
