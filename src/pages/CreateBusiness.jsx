import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import menuCategories from '../data/categories.json'

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
    type:{
			prepared:false,
			packed: false,
			frozen: false
		},
		categories: ['General'],
		bgUrl: '',
		pdfMenu: '',
		employees: [],
		owner: user._id,
	};

	const [business, setBusiness] = useState(initialState);

  const [menucategoriessearch, setmenucategoriessearch] = useState('')

	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleBusinessSubmit = (e) => {
		e.preventDefault();
		toast.success('Business successfully created', { theme: 'dark' });

		// Create an object representing the request body
		const requestBody = business;


		// Make an axios request to the API
		// If POST request is successful redirect to Business/Dashboard page
		// If the request resolves with an error, set the error message in the state
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/business/create`, requestBody)
			.then((response) => {
        const nameEncoded = response.name.toLowerCase().split(' ').join('-')
				navigate(`/${nameEncoded}/dashboard`);
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};
	return (
		<div className='container'>
			<h1>Let's create a Business!</h1>
			<div className='row justify-content-center p-4 mb-4'>
				<div className='col-md-8 '>
					<Form onSubmit={handleBusinessSubmit}>
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
            <hr />
						<div className='d-flex justify-content-around'>
              <Form.Group
								className='mb-3 col-md-5 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
                <Form.Label>Product Types</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label='Prepared'
                    name='prepared'
                    type='checkbox'
                    id={`inline-$'checkbox'-1`}
                    checked={business.type.prepared}
                    onChange={(e)=>{
                      setBusiness({...business, type : {...business.type, prepared:!business.type.prepared} })
                    }}
                  />
                  <Form.Check
                    inline
                    label='Packed'
                    name='packed'
                    type='checkbox'
                    id={`inline-$'checkbox'-2`}
                    checked={business.type.packed}
                    onChange={(e)=>{
                      setBusiness({...business, type : {...business.type, packed:!business.type.packed} })
                    }}
                  />
                  <Form.Check
                    inline
                    label='Frozen'
                    name='frozen'
                    type='checkbox'
                    id={`inline-$'checkbox'-3`}
                    checked={business.type.frozen}
                    onChange={(e)=>{
                      setBusiness({...business, type : {...business.type, frozen:!business.type.frozen} })
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group
								className='mb-3 col-md-5 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
                <Form.Label>Delivery Format</Form.Label>
                <div>
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
                    label='In-place'
                    name='inplace'
                    type='checkbox'
                    id={`inline-$'checkbox'-3`}
                    checked={business.format.inplace}
                    onChange={(e)=>{
                      setBusiness({...business, format : {...business.format, inplace:!business.format.inplace} })
                    }}
                  />
                </div>
              </Form.Group>

						</div>
            <Form.Group
								className='mb-3 d-flex flex-column align-items-start'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>Catalog Categories</Form.Label>
                <Form.Label className='card p-2 col-12 d-flex flex-row'>
                  {business.categories.map(cat => {
                    return <span key={cat} name={cat} className="badge rounded-pill bg-success m-1" onClick={(e) => {
                            let newCategories = business.categories.filter(cat=>{
                              return cat !== e.target.innerText
                            })
                            setBusiness({...business,categories:newCategories})
                          }}>{cat}</span>
                  })}
                </Form.Label>
								<Form.Control
									type='text'
									placeholder='Ex: Specialties, Snacks, Dessert, Drinks, etc'
									name='country'
									value={menucategoriessearch}
									onChange={(e)=>{
                    setmenucategoriessearch( e.target.value )
									}}
								/>
                <div className="d-flex flex-column align-items-start">
                  {menucategoriessearch!=='' && (menuCategories[0].src.filter(category=>{
                    return (category.toLowerCase().includes(menucategoriessearch.toLocaleLowerCase()) )
                      })
                      .map((category,i) => {
                        return(!business.categories.includes(category) && 
                          <div
                          key={`${category}-${i}`}
                            onClick={(e) => {
                              setBusiness({...business,categories:[...business.categories,e.target.innerText]})
                            }}
                            className="px-2"
                            data-name={category}
                          >
                            {category}
                          </div>
                        )
                      }) 
                  )}
                </div>
						</Form.Group>

            <div className='d-md-flex justify-content-md-between'>
            <Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
							>
								<Form.Label>Backgroung Image</Form.Label>
								<Form.Control
									type='file'
									name='bgUrl'
									value={business.bgUrl}
									onChange={(e) => {
										setBusiness({...business, [e.target.name]:e.target.value});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
							>
								<Form.Label>Menu PDF (optional)</Form.Label>
								<Form.Control
									type='file'
									name='pdfMenu'
									value={business.pdfMenu}
									onChange={(e) => {
										setBusiness({...business, [e.target.name]:e.target.value});
									}}
								/>
							</Form.Group>
						</div>
            <hr />
            <p>Create your Business to start adding products and/or employees</p>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
						
						<Button variant='primary' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-4'>
							Create the Business
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateBusiness;



// const [menucategoriessearch, setmenucategoriessearch] = useState('')