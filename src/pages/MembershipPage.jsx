import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

import { toast } from 'react-toastify';
import languages from '../data/language.json';
import { capitalize } from '../utils/functions';

import MembershipTable from '../components/MembershipTable';
import Loading from '../components/Loading';

function MembershipPage() {
	const { language: lang, user } = useContext(AuthContext);
	const navigate = useNavigate();

	const { businessName } = useParams();
	let businessNameEncoded = businessName.split(' ').join('-');
	const [business, setBusiness] = useState('');

	const [selectedPlan, setSelectedPlan] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const storedToken = localStorage.getItem('authToken');
	const openModal = (plan) => {
		setSelectedPlan(plan);
		setShow(true);
	};
	const handleChangeMembership = () => {
		const storedToken = localStorage.getItem('authToken');

		const requestBody = {
			selectedPlan,
			usedTrial: business.membership.usedTrial,
		};

		axios
			.put(
				`${process.env.REACT_APP_SERVER_URL}/business/membership/${businessNameEncoded}`,
				requestBody,
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			)
			.then((response) => {
				// eslint-disable-next-line no-lone-blocks
				{
					window.innerWidth < 450
						? toast.success(`${languages[0][lang].tostify.updateMembership}`, {
								position: toast.POSITION.BOTTOM_CENTER,
								theme: 'dark',
						  })
						: toast.success(`${languages[0][lang].tostify.updateMembership}`, {
								theme: 'dark',
						  });
				}

				navigate(`/${businessNameEncoded}/dashboard`);
			})
			.catch((error) => {
				console.log({ error });
				// eslint-disable-next-line no-lone-blocks
				{
					window.innerWidth < 450
						? toast.error(`${languages[0][lang].tostify.errorMembership}`, {
								position: toast.POSITION.BOTTOM_CENTER,
								theme: 'dark',
						  })
						: toast.error(`${languages[0][lang].tostify.errorMembership}`, {
								theme: 'dark',
						  });
				}
			});
	};
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER_URL}/business/membership/${businessNameEncoded}`,
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			)
			.then((response) => {
				setBusiness(response.data);
			})
			.catch((error) => {
				console.log({ error });
				// eslint-disable-next-line no-lone-blocks
				{
					window.innerWidth < 450
						? toast.error(`${languages[0][lang].tostify.redirect}`, {
								position: toast.POSITION.BOTTOM_CENTER,
								theme: 'dark',
						  })
						: toast.error(`${languages[0][lang].tostify.redirect}`, {
								theme: 'dark',
						  });
				}
				navigate('/');
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (business !== '') {
		if (business.owner !== user._id) {
			navigate('/');
		}
		return (
			<div>
				<h1 className='m-3'>{languages[0][lang].membership.title}</h1>
				{!business.membership.usedTrial && (
					<p>{languages[0][lang].membership.freeTrial}</p>
				)}
				<MembershipTable openModal={openModal} business={business} />
				<Modal
					show={show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{languages[0][lang].membership.mTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{languages[0][lang].membership.mBody}{' '}
						<strong>
							{capitalize(
								selectedPlan === 'trial' ? 'Free Trial' : selectedPlan
							)} Plan
						</strong>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							{languages[0][lang].membership.btnCancel}
						</Button>
						<Button variant='primary' onClick={handleChangeMembership}>
							{languages[0][lang].membership.btnConfirm}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	} else {
		return (
			<div>
				<Loading />
			</div>
		);
	}
}

export default MembershipPage;
