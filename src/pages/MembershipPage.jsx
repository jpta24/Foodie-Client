import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { Modal, Button } from 'react-bootstrap';

import languages from '../data/language.json';
import { capitalize } from '../utils/functions';
import { putAPI, getAPI } from '../utils/api';
import { toastifySuccess, toastifyError } from '../utils/tostify';

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

	const openModal = (plan) => {
		setSelectedPlan(plan);
		setShow(true);
	};
	const handleChangeMembership = () => {
		const requestBody = {
			selectedPlan,
			usedTrial: business.membership.usedTrial,
		};
		const url = `business/membership/${businessNameEncoded}`;
		const thenFunction = (response) => {
			toastifySuccess(`${languages[0][lang].tostify.updateMembership}`);
			navigate(`/view-business/${businessNameEncoded}`);
		};
		const errorFunction = (error) => {
			toastifyError(`${languages[0][lang].tostify.errorMembership}`);
		};
		putAPI(url, requestBody, thenFunction, errorFunction);
	};
	useEffect(() => {
		const url = `business/membership/${businessNameEncoded}`;
		const thenFunction = (response) => {
			setBusiness(response.data);
		};
		const errorFunction = () => {
			toastifyError(`${languages[0][lang].tostify.redirect}`);
			navigate('/');
		};
		getAPI(url, thenFunction, errorFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (business !== '' && user) {
		if (business.owner !== user._id) {
			navigate('/');
		}
		return (
			<div className='container'>
				<MembershipTable btnFunction={openModal} business={business} />
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
							)}{' '}
							Plan
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
