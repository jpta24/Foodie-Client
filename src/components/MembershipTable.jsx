import MembershipCard from '../components/MembershipCard';

function MembershipTable({ openModal, business }) {
	return (
		<div className='d-flex justify-content-center flex-wrap align-items-center col-md-10 mx-auto'>
			<MembershipCard
				string={'free'}
				price={'-'}
				openModal={openModal}
				business={business}
			/>
			<MembershipCard
				string={'basic'}
				price={'$5'}
				openModal={openModal}
				business={business}
			/>
			<MembershipCard
				string={'premium'}
				price={'$10'}
				openModal={openModal}
				business={business}
			/>
		</div>
	);
}

export default MembershipTable;
