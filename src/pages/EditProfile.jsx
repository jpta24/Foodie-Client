import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { Row, Button, Form } from 'react-bootstrap';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import { getAPI, putAPI } from '../utils/api';
import { toastifySuccess, toastifyError } from '../utils/tostify';

import { handleFileUpload } from '../utils/functions';

const EditProfilePage = () => {
	const { language: lang } = useContext(AuthContext);
	const { userID } = useParams();
	const { user: userAuth } = useContext(AuthContext);

	const [user, setUser] = useState('');

	const [currentUserImg, setCurrentUserImg] = useState(null);

	const imgSetterFunction = (field, string) => {
		setUser({ ...user, [field]: string });
		setCurrentUserImg(string);
	};

	useEffect(() => {
		const url = `users/${userID}`;
		const thenFunction = (response) => {
			setUser(response.data);
		};
		getAPI(url, thenFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	if (userAuth._id !== userID) {
		navigate(`/profile/${userAuth._id}`);
	}

	const handleEditProfile = (e) => {
		e.preventDefault();

		const requestBody = user;
		const url = `users/edit-profile/${user._id}`;
		const thenFunction = (response) => {
			toastifySuccess(`${languages[0][lang].tostify.editUser}`);
			navigate(`/profile/${user._id}`);
		};
		const errorFunction = (error) => {
			toastifyError(error.response.data.message);
		};
		putAPI(url, requestBody, thenFunction, errorFunction);
	};

	return (
		<div className='container'>
			<Row className='d-flex flex-row justify-content-center pt-3'>
				<div className='col-3 col-md-2 justify-content-center align-items-center mx-2'>
					<img
						src={user.avatarUrl || iconsCloud[0].userDefault}
						alt='altProfile'
						className='w-100 rounded-circle border border-dark p-2 d-block'
					/>
				</div>

				<div className='col-8 col-md-6 d-flex flex-column align-items-start'>
					<section className='d-flex flex-column align-items-start col-10 col-md-10'>
						<p>
							<strong>{languages[0][lang].profile.email}:</strong>{' '}
							<span className='font-weight-bold'>{user.email}</span>
						</p>
						<p>
							<strong>{languages[0][lang].profile.rol}:</strong>{' '}
							<span className='font-weight-bold'>{user.rol}</span>
						</p>
					</section>
					<Form onSubmit={handleEditProfile} className='pb-2 col-10'>
						<Form.Group
							className='mb-3 col-md-12 d-flex flex-column align-items-start'
							controlId='formBasicBusinessName'
						>
							<Form.Label className='mx-2'>
								<strong>{languages[0][lang].profile.name}</strong>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder={languages[0][lang].profile.name}
								name='name'
								value={user.name || ''}
								onChange={(e) => {
									setUser({ ...user, [e.target.name]: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3 col-md-12 d-flex flex-column align-items-start'
							controlId='formBasicBusinessName'
						>
							<Form.Label className='mx-2'>
								<strong>{languages[0][lang].profile.phone}</strong>
							</Form.Label>
							<Form.Control
								type='text'
								name='phone'
								placeholder={languages[0][lang].profile.phone}
								value={user.phone || ''}
								onChange={(e) => {
									setUser({ ...user, [e.target.name]: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3 col-md-12 d-flex flex-column align-items-start'
							controlId='formBasicProductName'
						>
							<Form.Label>{languages[0][lang].profile.image}</Form.Label>
							<Form.Control
								type='file'
								onChange={(e) =>
									handleFileUpload(
										e,
										currentUserImg,
										imgSetterFunction,
										'avatarUrl'
									)
								}
							/>
						</Form.Group>
						<Button
							variant='primary'
							size='lg'
							type='submit'
							className='mx-2 my-1 col-8 col-md-4'
						>
							{languages[0][lang].profile.btnEdit}
						</Button>
					</Form>
				</div>
			</Row>
		</div>
	);
};

export default EditProfilePage;
