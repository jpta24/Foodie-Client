import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import languages from '../data/language.json'

import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

const Signup = () => {
	const {language:lang} = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('')
    // const [rol, setRol] = useState('user')
    // const [avatarUrl, setAvatarUrl] = useState('/userActive.png')
	const [errorMessage, setErrorMessage] = useState(undefined);


	const handleSignupSubmit = (e) => {
		e.preventDefault();

		// Create an object representing the request body
		const requestBody = { username, password, email, lang };
		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody)
			.then((response) => {
				navigate('/login');
                // eslint-disable-next-line no-lone-blocks
				{window.innerWidth < 450 ? 
					toast.success(`${languages[0][lang].tostify.userSucc}`, {
						position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
					}) : toast.success(`${languages[0][lang].tostify.userSucc}`, { theme: 'dark' });}
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				// eslint-disable-next-line no-lone-blocks
				{window.innerWidth < 450 ? 
					toast.error(`${languages[0][lang].tostify.userError}`, {
						position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
					}) : toast.error(`${languages[0][lang].tostify.userError}`, { theme: 'dark' });}
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className='container'>
			<h1>{languages[0][lang].signup.greeting}</h1>
			<div className='row justify-content-md-center p-4'>
				<div className='col-md-6 col-lg-5 '>
					<form className='form-control' onSubmit={handleSignupSubmit}>
						{/* <div>
							<img src={rol==='user'? '/userActive.png':'/userInactive.png'} alt='altUser' onClick={()=>handleRol('user')} />
							<img src={rol==='employee'? '/employeeActive.png':'/employeeInactive.png'} alt='altemployee' onClick={()=>handleRol('employee')} />
                            <img src={rol==='business'? '/businessActive.png':'/businessInactive.png'} alt='altbusiness' onClick={()=>handleRol('business')} />
						</div> */}

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
                        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
						<div className='col-12 my-3'>
							<button type='submit' className='btn btn-primary col-4'>
							{languages[0][lang].signup.signup}
							</button>
						</div>
					</form>
                    <hr />
                    <p>{languages[0][lang].signup.account}</p>
                    <Button href='/login'  variant='outline-primary' className='mx-2 my-1 col-4'>{languages[0][lang].signup.login}</Button>
				</div>
			</div>
			
		</div>
	);
};

export default Signup;
