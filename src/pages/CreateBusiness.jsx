import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import menuCategories from '../data/categories.json';
import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import MembershipTable from '../components/MembershipTable';

import { handleFileUpload } from '../utils/functions';

const CreateBusiness = () => {
	const navigate = useNavigate();

	const { user, language: lang } = useContext(AuthContext);

	const initialState = {
		name: '',
		logoUrl: iconsCloud[0].defaultBusinessLogo,
		membership: {
			plan: 'trial',
		},
		address: {
			city: '',
			street: '',
			telephone: 0,
			email: '',
			postCode: 0,
			country: '',
		},
		currency: '',
		format: {
			delivery: {
				delivery: false,
				price: 0,
			},
			pickup: true,
			inplace: false,
		},
		payment: {
			cash: {
				accepted: true,
			},
			card: {
				accepted: false,
			},
			pp: {
				accepted: false,
				email: '',
			},
			pagoMovil: {
				accepted: false,
				ci: '',
			},
			zelle: {
				accepted: false,
				email: '',
			},
		},
		type: {
			prepared: false,
			packed: false,
			frozen: false,
		},
		categories: ['General'],
		bgUrl: iconsCloud[0].defaultBusinessBG,
		pdfMenu: '',
		employees: [],
		owner: user._id,
	};

	const preBusinessInitial = {
		membership: {
			plan: 'x',
			usedTrial: false,
		},
	};

	const [preBusiness, setPreBusiness] = useState(preBusinessInitial);

	const [business, setBusiness] = useState(initialState);

	const [menucategoriessearch, setmenucategoriessearch] = useState('');

	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleBusinessSubmit = (e) => {
		e.preventDefault();
		const storedToken = localStorage.getItem('authToken');
		if (business.currency === '') {
			business.currency = '$';
		}
		if (
			business.name === '' ||
			business.address.telephone === 0 ||
			business.address.email === ''
		) {
			return setErrorMessage(`${languages[0][lang].createBusiness.error}`);
		} else {
			// Create an object representing the request body
			const requestBody = business;

			// Make an axios request to the API
			// If POST request is successful redirect to Business/Dashboard page
			// If the request resolves with an error, set the error message in the state
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/business`, requestBody, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const nameEncoded = response.data.business.name.split(' ').join('-');
					navigate(`/${nameEncoded}/dashboard`);
					// eslint-disable-next-line no-lone-blocks
					{
						window.innerWidth < 450
							? toast.success(`${languages[0][lang].tostify.newBusiness}`, {
									position: toast.POSITION.BOTTOM_CENTER,
									theme: 'dark',
							  })
							: toast.success(`${languages[0][lang].tostify.newBusiness}`, {
									theme: 'dark',
							  });
					}
				})
				.catch((error) => {
					console.log({ error });
					const errorDescription = error.response.data.message;
					// eslint-disable-next-line no-lone-blocks
					{
						window.innerWidth < 450
							? toast.error(`${languages[0][lang].tostify.errorBusiness}`, {
									position: toast.POSITION.BOTTOM_CENTER,
									theme: 'dark',
							  })
							: toast.error(`${languages[0][lang].tostify.errorBusiness}`, {
									theme: 'dark',
							  });
					}
					setErrorMessage(errorDescription);
				});
		}
	};
	const [currentBusinessImg, setCurrentBusinessImg] = useState(null);

	const [currentBgImg, setCurrentBgImg] = useState(null);

	const [currentPdf, setCurrentPdf] = useState(null);

	const imgSetterFunctionLogo = (field, string) => {
		setBusiness({ ...business, [field]: string });
		setCurrentBusinessImg(string);
	};

	const imgSetterFunctionBg = (field, string) => {
		setBusiness({ ...business, [field]: string });
		setCurrentBgImg(string);
	};

	const imgSetterFunctionPdf = (field, string) => {
		setBusiness({ ...business, [field]: string });
		setCurrentPdf(string);
	};

	const btnFunctionMembership = (string) => {
		setBusiness({
			...business,
			membership: { ...business.membership, plan: string },
		});
		setPreBusiness({
			...preBusiness,
			membership: { ...preBusiness.membership, plan: string },
		});
	};

	return (
		<div className='container'>
			<h1>{languages[0][lang].createBusiness.title}</h1>
			<div className='row justify-content-center p-4 mb-4'>
				<div className=''>
					<Form onSubmit={handleBusinessSubmit}>
						<div className='d-md-flex justify-content-md-between col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessName'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.name}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.namePH}
									name='name'
									value={business.name}
									onChange={(e) => {
										setBusiness({
											...business,
											[e.target.name]: e.target.value,
										});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessName'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.logo}
								</Form.Label>
								<Form.Control
									type='file'
									onChange={(e) =>
										handleFileUpload(
											e,
											currentBusinessImg,
											imgSetterFunctionLogo,
											'logoUrl'
										)
									}
								/>
							</Form.Group>
						</div>
						<div className='d-md-flex justify-content-md-between col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessAddress'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.address}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.addressPH}
									name='street'
									value={business.address.street}
									onChange={(e) => {
										setBusiness({
											...business,
											address: { ...business.address, street: e.target.value },
										});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessCity'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.city}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.city}
									name='city'
									value={business.address.city}
									onChange={(e) => {
										setBusiness({
											...business,
											address: { ...business.address, city: e.target.value },
										});
									}}
								/>
							</Form.Group>
						</div>
						<div className='d-md-flex justify-content-md-between col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessPostCode'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.postcode}
								</Form.Label>
								<Form.Control
									type='number'
									placeholder={languages[0][lang].createBusiness.postcode}
									name='postCode'
									value={business.address.postCode}
									onChange={(e) => {
										setBusiness({
											...business,
											address: {
												...business.address,
												postCode: e.target.value,
											},
										});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.country}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.country}
									name='country'
									value={business.address.country}
									onChange={(e) => {
										setBusiness({
											...business,
											address: { ...business.address, country: e.target.value },
										});
									}}
								/>
							</Form.Group>
						</div>
						<div className='d-md-flex justify-content-md-between col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-md-6 d-flex flex-column align-items-start'
								controlId='formBasicBusinessEmail'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.email}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.email}
									name='email'
									value={business.address.email}
									onChange={(e) => {
										setBusiness({
											...business,
											address: { ...business.address, email: e.target.value },
										});
									}}
								/>
							</Form.Group>

							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicBusinessTelephone'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.phone}
								</Form.Label>
								<Form.Control
									type='number'
									placeholder={languages[0][lang].createBusiness.phone}
									name='telephone'
									value={business.address.telephone}
									onChange={(e) => {
										setBusiness({
											...business,
											address: {
												...business.address,
												telephone: e.target.value,
											},
										});
									}}
								/>
							</Form.Group>
						</div>
						<hr className='col-md-9 mx-auto' />
						<div className='d-flex justify-content-between flex-wrap col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-12 col-md-4 d-flex flex-column align-items-start'
								controlId='formCurrency'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.currency}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createBusiness.currencyPh}
									name='currency'
									value={business.currency}
									onChange={(e) => {
										setBusiness({
											...business,
											[e.target.name]: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group
								className='mb-3 col-md-7 col-8 d-flex flex-column align-items-start'
								controlId='formPaymentMethods'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.paymentMethods}
								</Form.Label>
								<div className='d-flex flex-column col-12'>
									<Form.Group className='col-md-8 d-flex align-items-start'>
										<Form.Check
											inline
											label={languages[0][lang].createBusiness.cash}
											name='cash'
											type='checkbox'
											id={`inline-$'checkbox'-1`}
											checked={business.payment.cash.accepted}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														cash: !business.payment.cash,
													},
												});
											}}
										/>
									</Form.Group>
									<Form.Group className='col-md-8 d-flex align-items-start'>
										<Form.Check
											inline
											label={languages[0][lang].createBusiness.cd}
											name='card'
											type='checkbox'
											id={`inline-$'checkbox'-1`}
											checked={business.payment.card.accepted}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														card: !business.payment.card,
													},
												});
											}}
										/>
									</Form.Group>
									<Form.Group className='col-md-8 d-flex align-items-start'>
										<Form.Check
											inline
											className='py-1 col-5 text-start'
											label={languages[0][lang].createBusiness.pp}
											name='pp'
											type='checkbox'
											id={`inline-$'checkbox'-1`}
											checked={business.payment.pp.accepted}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														pp: !business.payment.pp,
													},
												});
											}}
										/>
										<Form.Control
											className='py-1 col-8'
											type='text'
											placeholder={languages[0][lang].createBusiness.ppMailPh}
											name='pp'
											value={business.payment.pp.email}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														pp: {
															...business.payment.pp,
															email: e.target.value,
														},
													},
												});
											}}
										/>
									</Form.Group>
									<Form.Group className='col-md-8 d-flex align-items-start'>
										<Form.Check
											inline
											className='py-1 col-5 text-start'
											label={languages[0][lang].createBusiness.pm}
											name='pagoMovil'
											type='checkbox'
											id={`inline-$'checkbox'-1`}
											checked={business.payment.pagoMovil.accepted}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														pagoMovil: !business.payment.pagoMovil,
													},
												});
											}}
										/>
										<Form.Control
											className='py-1 col-8'
											type='text'
											placeholder={languages[0][lang].createBusiness.pmPh}
											name='pagoMovil'
											value={business.payment.pagoMovil.ci}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														pagoMovil: {
															...business.payment.pagoMovil,
															ci: e.target.value,
														},
													},
												});
											}}
										/>
									</Form.Group>
									<Form.Group className='col-md-8 d-flex align-items-start'>
										<Form.Check
											inline
											className='py-1 col-5 text-start'
											label={languages[0][lang].createBusiness.zelle}
											name='zelle'
											type='checkbox'
											id={`inline-$'checkbox'-1`}
											checked={business.payment.zelle.accepted}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														zelle: !business.payment.zelle,
													},
												});
											}}
										/>
										<Form.Control
											className='py-1 col-8'
											type='text'
											placeholder={languages[0][lang].createBusiness.zellePh}
											name='zelle'
											value={business.payment.zelle.email}
											onChange={(e) => {
												setBusiness({
													...business,
													payment: {
														...business.payment,
														zelle: {
															...business.payment.zelle,
															email: e.target.value,
														},
													},
												});
											}}
										/>
									</Form.Group>
								</div>
							</Form.Group>
						</div>
						<hr className='col-md-9 mx-auto' />
						<div className='d-flex justify-content-around col-md-8 mx-auto'>
							<Form.Group
								className='mb-3 col-md-5 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.prodType}
								</Form.Label>
								<div className='text-start'>
									<Form.Check
										inline
										label={languages[0][lang].createBusiness.prepared}
										name='prepared'
										type='checkbox'
										id={`inline-$'checkbox'-1`}
										checked={business.type.prepared}
										onChange={(e) => {
											setBusiness({
												...business,
												type: {
													...business.type,
													prepared: !business.type.prepared,
												},
											});
										}}
									/>
									<Form.Check
										inline
										label={languages[0][lang].createBusiness.packed}
										name='packed'
										type='checkbox'
										id={`inline-$'checkbox'-2`}
										checked={business.type.packed}
										onChange={(e) => {
											setBusiness({
												...business,
												type: {
													...business.type,
													packed: !business.type.packed,
												},
											});
										}}
									/>
									<Form.Check
										inline
										label={languages[0][lang].createBusiness.frozen}
										name='frozen'
										type='checkbox'
										id={`inline-$'checkbox'-3`}
										checked={business.type.frozen}
										onChange={(e) => {
											setBusiness({
												...business,
												type: {
													...business.type,
													frozen: !business.type.frozen,
												},
											});
										}}
									/>
								</div>
							</Form.Group>
							<Form.Group
								className='mb-3 col-md-7 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
								<Form.Label>
									{languages[0][lang].createBusiness.deliveryFormat}
								</Form.Label>
								<div className='d-md-flex justify-content-end'>
									<Form.Check
										inline
										className='py-1 mr-1 text-start'
										label={languages[0][lang].createBusiness.pickup}
										name='pickup'
										type='checkbox'
										id={`inline-$'checkbox'-2`}
										checked={business.format.pickup}
										onChange={(e) => {
											setBusiness({
												...business,
												format: {
													...business.format,
													pickup: !business.format.pickup,
												},
											});
										}}
									/>
									<Form.Check
										inline
										className='py-1 mr-1 text-start'
										label={languages[0][lang].createBusiness.inplace}
										name='inplace'
										type='checkbox'
										id={`inline-$'checkbox'-3`}
										checked={business.format.inplace}
										onChange={(e) => {
											setBusiness({
												...business,
												format: {
													...business.format,
													inplace: !business.format.inplace,
												},
											});
										}}
									/>

									<Form.Check
										inline
										className='py-1 mx-0 text-start'
										label={languages[0][lang].createBusiness.delivery}
										name='delivery'
										type='checkbox'
										id={`inline-$'checkbox'-1`}
										checked={business.format.delivery.delivery}
										onChange={(e) => {
											setBusiness({
												...business,
												format: {
													...business.format,
													delivery: {
														...business.format.delivery,
														delivery: !business.format.delivery.delivery,
													},
												},
											});
										}}
									/>
									<div className='col-md-4 col-8 mx-auto'>
										<InputGroup className='mb-3'>
											<InputGroup.Text>
												{business.currency || '$'}
											</InputGroup.Text>
											<Form.Control
												className='py-1'
												type='number'
												placeholder={
													languages[0][lang].createBusiness.deliveryPrice
												}
												name='price'
												value={business.format.delivery.price}
												onChange={(e) => {
													setBusiness({
														...business,
														format: {
															...business.format,
															delivery: {
																...business.format.delivery,
																price: e.target.value,
															},
														},
													});
												}}
											/>
										</InputGroup>
									</div>
								</div>
							</Form.Group>
						</div>
						<Form.Group
							className='mb-3 d-flex flex-column align-items-start col-md-8 mx-auto'
							controlId='formBasicBusinessCountry'
						>
							<Form.Label>
								{languages[0][lang].createBusiness.categories}
							</Form.Label>
							<Form.Label className='card p-2 col-12 d-flex flex-row'>
								{business.categories.map((cat) => {
									return (
										<span
											key={cat}
											name={cat}
											className='badge rounded-pill bg-success m-1'
											onClick={(e) => {
												let newCategories = business.categories.filter(
													(cat) => {
														return cat !== e.target.innerText;
													}
												);
												setBusiness({ ...business, categories: newCategories });
											}}
										>
											{cat}
										</span>
									);
								})}
							</Form.Label>
							<Form.Control
								type='text'
								placeholder={languages[0][lang].createBusiness.categoriesPh}
								value={menucategoriessearch}
								onChange={(e) => {
									setmenucategoriessearch(e.target.value);
								}}
							/>
							<div className='d-flex flex-column align-items-start'>
								{menucategoriessearch !== '' &&
									menuCategories[0].src
										.filter((category) => {
											return category
												.toLowerCase()
												.includes(menucategoriessearch.toLocaleLowerCase());
										})
										.map((category, i) => {
											return (
												!business.categories.includes(category) && (
													<div
														key={`${category}-${i}`}
														onClick={(e) => {
															setBusiness({
																...business,
																categories: [
																	...business.categories,
																	e.target.innerText,
																],
															});
														}}
														className='px-2'
														data-name={category}
													>
														{category}
													</div>
												)
											);
										})}
							</div>
						</Form.Group>

						<div className='d-md-flex justify-content-md-between col-md-8 mx-auto'>
							<Form.Group className='mb-3 col-md-5 d-flex flex-column align-items-start'>
								<Form.Label>
									{languages[0][lang].createBusiness.background}
								</Form.Label>
								<Form.Control
									type='file'
									onChange={(e) =>
										handleFileUpload(
											e,
											currentBgImg,
											imgSetterFunctionBg,
											'bgUrl'
										)
									}
								/>
							</Form.Group>

							<Form.Group className='mb-3 col-md-5 d-flex flex-column align-items-start'>
								<Form.Label>
									{languages[0][lang].createBusiness.menuPdf}
								</Form.Label>
								<Form.Control
									type='file'
									onChange={(e) =>
										handleFileUpload(
											e,
											currentPdf,
											imgSetterFunctionPdf,
											'pdfMenu'
										)
									}
								/>
							</Form.Group>
						</div>

						<hr className='col-md-9 mx-auto' />
						<p>{languages[0][lang].createBusiness.note}</p>
						{errorMessage && <p className='text-danger'>{errorMessage}</p>}
						<MembershipTable
							btnFunction={btnFunctionMembership}
							business={preBusiness}
						/>
						<Button
							variant='primary'
							size='lg'
							type='submit'
							className='mx-2 my-1 col-8 col-md-4'
						>
							{languages[0][lang].createBusiness.btnCreate}
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateBusiness;
