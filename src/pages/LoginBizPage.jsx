import { useState, useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LoginBizPage = () => {
    const { businessName } = useParams();
    const navigate = useNavigate();
	const { storeToken, authenticateUser } = useContext(AuthContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		const requestBody = { username, password };

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)
			.then((response) => {
				// Request to the server's endpoint `/auth/login` returns a response
				// with the JWT string ->  response.data.authToken
				// console.log('JWT token', response.data.authToken );
				storeToken(response.data.authToken); // store in my localStorage the authToken
				authenticateUser(); // verify token is valid to get the user information from the server
				navigate(`/${businessName}`);
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				// eslint-disable-next-line no-lone-blocks
				{window.innerWidth < 450 ? 
					toast.error("Sorry, read the error message !", {
						position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
					}) : toast.error('Sorry, read the error message', { theme: 'dark' });}
				
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className='container'>
			<h1>Welcome back</h1>
			<p>Enter your credentials to access your account</p>

			<div className='row justify-content-md-center p-4'>
				<div className='col-md-6 col-lg-5 '>
					<form className='form-control' onSubmit={handleLoginSubmit}>
						<div className='col-md-12 d-flex flex-column align-items-start justify-content-start my-2'>
							<label htmlFor='inputUser01' className='form-label'>
								Username
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
							<label htmlFor='inputPassword01' className='form-label'>
								Password
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
							<Button type='submit' className='col-4'>
								Log In
							</Button>
						</div>
					</form>
					<hr />
					<p>Don't have an account?</p>
					<Button
						href={`/signup/${businessName}`}
						variant='outline-primary'
						className='mx-2 my-1 col-4'
					>
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginBizPage