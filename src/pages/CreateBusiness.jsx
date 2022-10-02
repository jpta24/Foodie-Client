import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateBusiness = () => {
	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const initialState = {
		name: '',
		logoUrl: '',
		address: {
			city: '',
			street: '',
			postCode: 0,
			country: '',
		},
		format: {
      delivery:false,
      "pickup": false,
      'inplace': false
    },
		categories: [],
		bgUrl: '',
		fooding: [],
		pdfMenu: '',
		employees: [],
		owner: user._id,
	};

	const [business, setBusiness] = useState(initialState);

	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		toast.success('User successfully created', { theme: 'dark' });

		// Create an object representing the request body
		// const requestBody = { username, password, email };

		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		// axios
		// 	.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody)
		// 	.then((response) => {
		// 		navigate('/login');
		// 	})
		// 	.catch((error) => {
		// 		const errorDescription = error.response.data.message;
		// 		setErrorMessage(errorDescription);
		// 	});
	};
	return (
		<div className='container'>
			<h1>Let's create a Business!</h1>
			<div className='row justify-content-center p-4'>
				<div className='col-md-8 '>
					<Form>
						<div className='d-md-flex justify-content-md-between'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessName'
							>
								<Form.Label>Business Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter a Name for your Business'
									name='name'
									value={business.name}
									onChange={(e) => {
										setBusiness({...business, [e.target.name]:e.target.value});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessName'
							>
								<Form.Label>Business Logo</Form.Label>
								<Form.Control
									type='file'
									name='logoUrl'
									value={business.logoUrl}
									onChange={(e) => {
										setBusiness({...business, [e.target.name]:e.target.value});
									}}
								/>
							</Form.Group>
						</div>
						<div className='d-md-flex justify-content-md-between'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessAddress'
							>
								<Form.Label>Address</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter an Address for your Business'
									name='street'
									value={business.address.street}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, street:e.target.value }});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessCity'
							>
								<Form.Label>City</Form.Label>
								<Form.Control
									type='text'
									placeholder='City'
									name='city'
									value={business.address.city}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, city:e.target.value }});
									}}
								/>
							</Form.Group>
						</div>
						<div className='d-md-flex justify-content-md-between'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessPostCode'
							>
								<Form.Label>PostCode</Form.Label>
								<Form.Control
									type='number'
									placeholder='PostCode'
									name='postCode'
									value={business.address.postCode}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, postCode:e.target.value }});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>Country</Form.Label>
								<Form.Control
									type='text'
									placeholder='Country'
									name='country'
									value={business.address.country}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, country:e.target.value }});
									}}
								/>
							</Form.Group>
						</div>
            <Form.Label>Delivery Format</Form.Label>
						<div className='d-flex justify-content-around'>
								<Form.Check
									inline
									label='Delivery'
									name='delivery'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
                  checked={business.format.delivery}
                  onChange={(e)=>{
                    setBusiness({...business, format : {...business.format, delivery:!business.format.delivery} })
                  }}
                  
								/>
								<Form.Check
									inline
									label='Pick-up'
									name='pickup'
									type='checkbox'
									id={`inline-$'checkbox'-2`}
                  checked={business.format.pickup}
                  onChange={(e)=>{
                    setBusiness({...business, format : {...business.format, pickup:!business.format.pickup} })
                  }}
								/>
								<Form.Check
									inline
									label='in-place'
									name='inplace'
									type='checkbox'
									id={`inline-$'checkbox'-3`}
                  checked={business.format.inplace}
                  onChange={(e)=>{
                    setBusiness({...business, format : {...business.format, inplace:!business.format.inplace} })
                  }}
								/>
						</div>
						
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateBusiness;

// format: 'delivery',
// 		categories: [],
// 		bgUrl: '',
// 		fooding: [],
// 		pdfMenu: '',
// 		employees: [],
// 		owner: user._id,
