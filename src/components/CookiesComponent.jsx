import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import policy from '../data/policies.json';
import { BiCookie } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';

const CookieBanner = ({ page = null }) => {
	const { language: lang } = useContext(AuthContext);

	const [showModal, setShowModal] = useState(false);
	const [showCookie, setShowCookie] = useState(false);
	const [cookiesAccepted, setCookiesAccepted] = useState(undefined);

	useEffect(() => {
		setCookiesAccepted(localStorage.getItem('cookiesAccepted'));
		if (cookiesAccepted === null) {
			setShowModal(true);
			setShowCookie(true);
		} else if (page === 'home') {
			setShowCookie(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookiesAccepted]);

	const handleAcceptCookies = (decision) => {
		localStorage.setItem('cookiesAccepted', decision);
        setCookiesAccepted(decision)
		setShowModal(false);
		if (page !== 'home') {
			setShowCookie(false);
		}
	};
	return (
		<>
			{showCookie && (
				<div className='cookie-icon' onClick={() => setShowModal(!showModal)}>
					<BiCookie className='fs-1' />
				</div>
			)}

			{showModal && (
				<div className='cookie-modal text-dark'>
					<div className='col-md-9 mx-auto'>
						<div
							onClick={() => setShowModal(false)}
							className='cookie-modal-close'
						>
							<IoCloseSharp />
						</div>
						<h2>{policy[0][lang].cookies.title}</h2>
						<p className='text-start p-3'>
							{policy[0][lang].cookies.text}{' '}
							<span>
								<Link to={'/private-policy'}>{policy[0][lang].cookies.link}</Link>
							</span>
						</p>
						<div className='d-flex justify-conten-end'>
							<button
								className='btn btn-outline-secondary px-2 py-1 col-md-2 col-5 mx-auto my-2'
								onClick={() => handleAcceptCookies(false)}
							>
								{policy[0][lang].cookies.decline}
							</button>
							<button
								className='btn btn-primary px-2 py-1 col-md-2 col-5 mx-auto my-2'
								onClick={() => handleAcceptCookies(true)}
							>
								{policy[0][lang].cookies.acceptAll}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CookieBanner;
