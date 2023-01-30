import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import menuCategories from '../data/categories.json'
import Loading from '../components/Loading';

const EditBusiness = () => {
    const navigate = useNavigate();
    const { businessName } = useParams();
    
    let businessNameEncoded = businessName.split(' ').join('-')

	const [business, setBusiness] = useState('');
    
    const storedToken = localStorage.getItem("authToken"); 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setBusiness(response.data.business)
          })
          .catch((error) => {
              console.log({error});
              // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error("Sorry you are being redirected !", {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error('Sorry you are being redirected', { theme: 'dark' });}
              navigate('/')
              })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  	const [menucategoriessearch, setmenucategoriessearch] = useState('')

	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleBusinessSubmit = (e) => {
		e.preventDefault();
    	const storedToken = localStorage.getItem("authToken"); 
		if (business.currency === ''){
			business.currency = '$'
		}
		if (business.name === '' || business.address.telephone === 0 || business.address.email==='') {
            return setErrorMessage('Please provide a Name, telephone and valid email')
        } else {
		// Create an object representing the request body
		const requestBody = business;

		// Make an axios request to the API
		// If POST request is successful redirect to Business/Dashboard page
		// If the request resolves with an error, set the error message in the state
		axios
			.put(`${process.env.REACT_APP_SERVER_URL}/business/edit/${businessNameEncoded}`, requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
			.then((response) => {
        	navigate(`/${businessNameEncoded}/dashboard`);
			// eslint-disable-next-line no-lone-blocks
			{window.innerWidth < 450 ? 
				toast.success("Business successfully edited !", {
					position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
				}) : toast.success('Business successfully edited', { theme: 'dark' });}
			})
			.catch((error) => {
        		console.log({error});
				const errorDescription = error.response.data.message;
				// eslint-disable-next-line no-lone-blocks
				{window.innerWidth < 450 ? 
					toast.error("Business could not be Created !", {
						position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
					}) : toast.error('Business could not be Created', { theme: 'dark' });}
						setErrorMessage(errorDescription);
					});
				};	
	}

		

  const uploadImage = (file) => {
    return  axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, file)
      .then(res => res.data)
      .catch(err=>console.log(err));
  };

  const handleFileUpload = (e,field) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    uploadImage(uploadData)
      .then(response => {
        // console.log(response.fileUrl);
        // response carries "fileUrl" which we can use to update the state
        setBusiness({...business, [field]:response.fileUrl});
        
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  
  if (business) {
    return (
		<div className='container'>
			<h1>Let's edit the Business!</h1>
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
                  					onChange={(e) => handleFileUpload(e,'logoUrl')}
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
						<div className='d-md-flex justify-content-md-between'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessEmail'
							>
								<Form.Label>E-mail</Form.Label>
								<Form.Control
									type='text'
									placeholder='E-mail'
									name='email'
									value={business.address.email}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, email:e.target.value }});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessTelephone'
							>
								<Form.Label>Telephone</Form.Label>
								<Form.Control
									type='number'
									placeholder='Telephone'
									name='telephone'
									value={business.address.telephone}
									onChange={(e) => {
										setBusiness({...business, address: {...business.address, telephone:e.target.value }});
									}}
								/>
							</Form.Group>
						</div>
            			<hr />
						<div className='d-flex justify-content-between flex-wrap'>
						<Form.Group
							className='mb-3 col-12 col-md-4 d-flex flex-column align-items-start'
							controlId='formCurrency'
						>
							<Form.Label>Currency</Form.Label>
							<Form.Control
								type='text'
								placeholder='Simbol'
								name='currency'
								value={business.currency}
								onChange={(e) => {
									setBusiness({...business, [e.target.name]:e.target.value});
								}}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3 col-md-7 col-8 d-flex flex-column align-items-start'
							controlId='formPaymentMethods'
						>
							<Form.Label>Payment Methods</Form.Label>
							<div className='d-flex flex-column col-12'>
							<Form.Group
							className='col-md-8 d-flex align-items-start'
							>
								<Form.Check
									inline
									label='Cash'
									name='cash'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.payment.cash.accepted}
									onChange={(e)=>{
									setBusiness({...business, payment : {...business.payment, cash:!business.payment.cash} })
									}}
								/>
							</Form.Group>
							<Form.Group
							className='col-md-8 d-flex align-items-start'
							>
								<Form.Check
									inline
									label='Credit Card'
									name='card'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.payment.card.accepted}
									onChange={(e)=>{
									setBusiness({...business, payment : {...business.payment, card:!business.payment.card} })
									}}
								/>
								
							</Form.Group>
							<Form.Group
							className='col-md-8 d-flex align-items-start'
							>
								<Form.Check
									inline
									className='py-1 col-5 text-start'
									label='PayPal'
									name='pp'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.payment.pp.accepted}
									onChange={(e)=>{
									setBusiness({...business, payment : {...business.payment, pp:!business.payment.pp} })
									}}
								/>
								<Form.Control
									className='py-1 col-8'
									type='text'
									placeholder='PayPal email address'
									name='pp'
									value={business.payment.pp.email}
									onChange={(e) => {
										setBusiness({...business, payment: {...business.payment, pp:{...business.payment.pp, email:e.target.value}}});
									}}
								/>
							</Form.Group>
							<Form.Group
							className='col-md-8 d-flex align-items-start'
							>
								<Form.Check
									inline
									className='py-1 col-5 text-start'
									label='PagoMovil'
									name='pagoMovil'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.payment.pagoMovil.accepted}
									onChange={(e)=>{
									setBusiness({...business, payment : {...business.payment, pagoMovil:!business.payment.pagoMovil} })
									}}
								/>
								<Form.Control
									className='py-1 col-8'
									type='text'
									placeholder='PagoMovil ID number'
									name='pagoMovil'
									value={business.payment.pagoMovil.ci}
									onChange={(e) => {
										setBusiness({...business, payment: {...business.payment, pagoMovil:{...business.payment.pagoMovil, ci:e.target.value}}});
									}}
								/>
							</Form.Group>
							<Form.Group
							className='col-md-8 d-flex align-items-start'
							>
								<Form.Check
									inline
									className='py-1 col-5 text-start'
									label='Zelle'
									name='zelle'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.payment.zelle.accepted}
									onChange={(e)=>{
									setBusiness({...business, payment : {...business.payment, zelle:!business.payment.zelle} })
									}}
								/>
								<Form.Control
									className='py-1 col-8'
									type='text'
									placeholder='Zelle email address'
									name='zelle'
									value={business.payment.zelle.email}
									onChange={(e) => {
										setBusiness({...business, payment: {...business.payment, zelle:{...business.payment.zelle, email:e.target.value}}});
									}}
								/>
							</Form.Group>
							</div>
						</Form.Group>
						</div>
						<hr />
						<div className='d-flex justify-content-around'>
              				<Form.Group
								className='mb-3 col-md-5 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>Product Types</Form.Label>
								<div className='text-start'>
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
								className='mb-3 col-md-7 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>Delivery Format</Form.Label>
								<div className='d-md-flex justify-content-end'>
								
								<Form.Check
									inline
									className='py-1 mr-1 text-start'
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
									className='py-1 mr-1 text-start'
									label='In-place'
									name='inplace'
									type='checkbox'
									id={`inline-$'checkbox'-3`}
									checked={business.format.inplace}
									onChange={(e)=>{
									setBusiness({...business, format : {...business.format, inplace:!business.format.inplace} })
									}}
								/>
								
								<Form.Check
									inline
									className='py-1 mx-0 text-start'
									label='Delivery'
									name='delivery'
									type='checkbox'
									id={`inline-$'checkbox'-1`}
									checked={business.format.delivery.delivery}
									onChange={(e)=>{
									setBusiness({...business, format : {...business.format, delivery:{...business.format.delivery, delivery:!business.format.delivery.delivery}}})
									}}
								/>
								<div className="col-md-4 col-8 mx-auto">
									<InputGroup className="mb-3">
										<InputGroup.Text>{business.currency || '$'}</InputGroup.Text>
										<Form.Control
										className='py-1'
										type='number'
										placeholder='Delivery Price'
										name='price'
										value={business.format.delivery.price}
										onChange={(e) => {
											setBusiness({...business, format: {...business.format, delivery:{...business.format.delivery, price:e.target.value}}});
										}}
									/>
									</InputGroup>
									
								</div>
								
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
									onChange={(e) => handleFileUpload(e,'bgUrl')}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
							>
								<Form.Label>Menu PDF (optional)</Form.Label>
								<Form.Control
									type='file'
									onChange={(e) => handleFileUpload(e,'pdfMenu')}
								/>
							</Form.Group>
						</div>
            			{errorMessage && <p className='text-danger'>{errorMessage}</p>}
						
						<Button variant='success' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-4'>
							Edit the Business
						</Button>
					</Form>
				</div>
			</div>
		</div>
	)
  } else {
    <Loading/>
  }
	
}

export default EditBusiness