import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from 'react-router-dom';

import languages from '../data/language.json';

import { Button, Form } from 'react-bootstrap';

import { postAPI } from '../utils/api';
import { toastifySuccess, toastifyError } from '../utils/tostify';

const Signup = () => {
	const { language: lang } = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [terms, setTerms] = useState('');
	// const [rol, setRol] = useState('user')
	// const [avatarUrl, setAvatarUrl] = useState('/userActive.png')
	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleSignupSubmit = (e) => {
		e.preventDefault();

		// Create an object representing the request body
		const requestBody = { username, password, email, lang, terms };
		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		const url = `auth/signup`;
		const thenFunction = (response) => {
			navigate(`/login`);
			toastifySuccess(`${languages[0][lang].tostify.userSucc}`);
		};
		const errorFunction = (error) => {
			toastifyError(`${languages[0][lang].tostify.userError}`);
			setErrorMessage(error.response.data.message);
		};
		postAPI(url, requestBody, thenFunction, errorFunction);
	};

	return (
		<div className={`container`}>
			<h1 className='text-danger'>{languages[0][lang].signup.greeting}</h1>
			<div className='row justify-content-md-center p-4'>
				<div className='col-md-6 col-lg-5 '>
					<form className='form-control' onSubmit={handleSignupSubmit}>
						<div className='col-md-12 d-flex flex-column align-items-start justify-content-start my-2'>
							<label htmlFor='inputUser01' className='form-label'>
								{languages[0][lang].signup.username}
							</label>
							<input
								name='username'
								type='text'
								className='form-control'
								id='inputUser01'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
						</div>

						<div className='col-md-12 d-flex flex-column align-items-start justify-content-start my-2'>
							<label htmlFor='inputEmail01' className='form-label'>
								{languages[0][lang].signup.email}
							</label>
							<input
								name='email'
								type='email'
								className='form-control'
								id='inputEmail01'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>

						<div className='col-md-12 d-flex flex-column align-items-start justify-content-start my-2'>
							<label htmlFor='inputPassword01' className='form-label'>
								{languages[0][lang].signup.password}
							</label>
							<input
								name='password'
								type='password'
								className='form-control'
								id='inputPassword01'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<Form.Group className='d-flex align-items-start'>
							<Form.Check
								inline
								label={
									<span>
										{languages[0][lang].signup.terms}{' '}
										<Link to='/terms-conditions'>{languages[0][lang].signup.termsLink}</Link>
									</span>
								}
								name='cash'
								type='checkbox'
								id={`inline-$'checkbox'-1`}
								checked={terms}
								onChange={() => {
									setTerms(!terms);
								}}
							/>
						</Form.Group>
						{errorMessage && <p className='text-danger'>{errorMessage}</p>}
						<div className='col-12 my-3'>
							<button type='submit' className='btn btn-primary col-4'>
								{languages[0][lang].signup.signup}
							</button>
						</div>
					</form>
					<hr />
					<p>{languages[0][lang].signup.account}</p>
					<Button
						href='/login'
						variant='outline-primary'
						className='mx-2 my-1 col-4'
					>
						{languages[0][lang].signup.login}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
