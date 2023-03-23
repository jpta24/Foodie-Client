import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { v4 as uuidv4 } from 'uuid';

import { Button } from 'react-bootstrap';
import languages from '../data/language.json';
import { HiBadgeCheck } from 'react-icons/hi';

function MembershipCard({ string, price, openModal, activePlan }) {
	const { language: lang } = useContext(AuthContext);

	const info = {
		plan1: languages[0][lang].home[`${string}1`],
		plan2: languages[0][lang].home[`${string}2`],
		plan3: languages[0][lang].home[`${string}3`],
		plan4: languages[0][lang].home[`${string}4`],
		plan5: languages[0][lang].home[`${string}5`],
	};

	return (
		<div className='col-md-3 col-10 border border-dark rounded text-start p-4 m-2'>
			<p className='h5'>{languages[0][lang].home[`${string}Title`]}</p>
			<p className='h3'>
				{price}
				<span className='h5'>
					{price !== '-' && languages[0][lang].home.perMon}
				</span>
			</p>
			<p className='h6'>All you need to expand your Business</p>
			<hr />
			{Object.values(info).map((plan) => {
				return (
					<div key={uuidv4()}>
						<HiBadgeCheck color='#999' /> {plan}
					</div>
				);
			})}
			<Button
				variant={
					activePlan.plan === string
						? 'secondary'
						: activePlan.usedTrial === false && string === 'premium'
						? 'primary'
						: 'outline-primary'
				}
				className='my-3 mx-auto col-12'
				onClick={() => {
					activePlan.plan !== string && openModal(string);
				}}
			>
				{activePlan.plan === string
					? languages[0][lang].membership.actualPlan
					: activePlan.usedTrial === false && string === 'premium'
					? languages[0][lang].membership.freeTrial
					: languages[0][lang].home.btnSelect}
			</Button>
		</div>
	);
}

export default MembershipCard;
