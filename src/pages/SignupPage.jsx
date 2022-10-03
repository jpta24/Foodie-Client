import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

const Signup = () => {
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
		const requestBody = { username, password, email };
		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody)
			.then((response) => {
				navigate('/login');
                toast.success('User successfully created', { theme: 'dark' });
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
                toast.error('User could not be Created', { theme: 'dark' });
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className='container'>
			<h1>Let's get Started !</h1>
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
							<label htmlFor='inputEmail01' className='form-label'>
								Email
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
							<button type='submit' className='btn btn-primary col-4'>
								Sign up
							</button>
						</div>
					</form>
                    <hr />
                    <p>Already have an account?</p>
                    <Button href='/login'  variant='outline-primary' className='mx-2 my-1 col-4'>Log In</Button>
				</div>
			</div>
			
		</div>
	);
};

export default Signup;
