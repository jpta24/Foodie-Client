import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { v4 as uuidv4 } from 'uuid';

import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import Loading from '../components/Loading';
import { getAPI, postAPI } from '../utils/api';
import { toastifySuccess, toastifyError } from '../utils/tostify';

import { handleFileUpload } from '../utils/functions';

const CreateProduct = () => {
	const { user, language: lang } = useContext(AuthContext);
	const { businessName } = useParams();
	const navigate = useNavigate();

	let businessNameEncoded = businessName.split(' ').join('-');

	const [business, setBusiness] = useState('');

	const [errorMessage, setErrorMessage] = useState(undefined);

	const initialState = {
		name: '',
		mainImg: '',
		description: '',
		business: '',
		type: '',
		price: '',
		ingredients: [],
		categories: ['General'],
		status: 'active',
		weight: '',
	};

	const [product, setProduct] = useState(initialState);
	const [menucategoriessearch, setmenucategoriessearch] = useState('');

	const [productingredientsearch, setproductingredientsearch] = useState('');

	useEffect(() => {
		const url = `business/${businessNameEncoded}`;
		const thenFunction = (response) => {
			setBusiness(response.data.business);
			setProduct({ ...product, business: response.data.business._id });
		};
		const errorFunction = () => {
			toastifyError(`${languages[0][lang].tostify.redirect}`);
			navigate('/');
		};
		getAPI(url, thenFunction, errorFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleProductSubmit = (e) => {
		e.preventDefault();

		const requestBody = product;

		const url = `products`;
		const thenFunction = (response) => {
			setProduct({ ...initialState, business: business._id });
			setCurrentProductImg(null)
			toastifySuccess(`${languages[0][lang].tostify.newProduct}`);
		};
		const errorFunction = (error) => {
			toastifyError(`${languages[0][lang].tostify.productError}`);
			setErrorMessage(error.response.data.message);
		};
		postAPI(url, requestBody, thenFunction, errorFunction);
	};
	const [currentProductImg, setCurrentProductImg] = useState(null);

	const imgSetterFunction = (field, string) => {
		setProduct({ ...product, [field]: string });
		setCurrentProductImg(string);
	};
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => setShowModal(false);

	if (business !== '') {
		if (business.owner !== user._id) {
			navigate('/');
		}

		return (
			<div className='container-fluid content-container'>
				<div className='row p-0'>
					<div
						className='d-flex flex-column align-items-center justify-content-between'
						style={{
							backgroundImage: `url('${business.bgUrl}')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							height: '150px',
						}}
					>
						<div className='d-flex col-12 justify-content-start'>
							<Link className='m-2' to={`/${businessNameEncoded}/products`}>
								<span className='shadow m-2 '>
									<img src={iconsCloud[0].backIcon} alt='backIcon' width={35} />
								</span>
							</Link>
						</div>
						<div className='d-flex justify-content-center align-items-end'>
							<div
								className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center'
								style={{
									height: '90px',
									width: '90px',
								}}
							>
								<img src={business.logoUrl} alt='altLogo' width={65} />
							</div>
						</div>
					</div>
				</div>
				<h1>{business.name}</h1>
				<h3>{languages[0][lang].createProduct.greeting}</h3>
				<div className='row justify-content-center p-4 mb-4'>
					<div className='col-md-8 '>
						<Form onSubmit={handleProductSubmit}>
							<div className='col-4 m-2 mx-auto'>
								<div
									className={`p-2 rounded-circle border border-dark d-flex justify-items-center m-auto $`}
									style={{
										height: '100px',
										width: '100px',
										backgroundImage: `url('${
											product.mainImg === ''
												? iconsCloud[0].noImageIcon
												: product.mainImg
										}')`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
									}}
								></div>
							</div>

							<div className='d-md-flex justify-content-md-between'>
								<Form.Group
									className='mb-3 col-md-6 d-flex flex-column align-items-start'
									controlId='formBasicProductName'
								>
									<Form.Label>
										{languages[0][lang].createProduct.name}
									</Form.Label>
									<Form.Control
										type='text'
										placeholder={languages[0][lang].createProduct.namePh}
										name='name'
										value={product.name}
										onChange={(e) => {
											setProduct({
												...product,
												[e.target.name]: e.target.value,
											});
										}}
									/>
								</Form.Group>

								<Form.Group
									className='mb-3 col-md-5 d-flex flex-column align-items-start'
									controlId='formBasicProductName'
								>
									<Form.Label>
										{languages[0][lang].createProduct.image}{' '}
										<HiOutlineInformationCircle
											style={{ color: 'red', cursor: 'pointer' }}
											onClick={() => setShowModal(true)}
										/>
									</Form.Label>
									<Form.Control
										type='file'
										onChange={(e) =>
											handleFileUpload(
												e,
												currentProductImg,
												imgSetterFunction,
												'mainImg'
											)
										}
									/>
								</Form.Group>
							</div>

							<div className='d-md-flex justify-content-md-between'>
								<Form.Group
									className='mb-3 col-12 d-flex flex-column align-items-start'
									controlId='formBasicProductName'
								>
									<Form.Label>
										{languages[0][lang].createProduct.description}
									</Form.Label>
									<Form.Control
										as='textarea'
										rows={3}
										type='text'
										placeholder={languages[0][lang].createProduct.descriptionPh}
										name='description'
										value={product.description}
										onChange={(e) => {
											setProduct({
												...product,
												[e.target.name]: e.target.value,
											});
										}}
									/>
								</Form.Group>
							</div>
							<div className='d-flex justify-content-around'>
								<Form.Group
									className='mb-3 col-md-5 d-flex flex-column'
									controlId='formBasicBusinessCountry'
								>
									<Form.Label>
										{languages[0][lang].createProduct.type}
									</Form.Label>
									<div>
										{Object.entries(business.type).map((eachType) => {
											return (
												eachType[1] && (
													<Form.Check
														inline
														key={uuidv4()}
														label={
															eachType[0][0].toUpperCase() +
															eachType[0].slice(1)
														}
														name={eachType[0]}
														type='radio'
														id={`inline-$'radio'-1`}
														checked={eachType[0] === product.type}
														onChange={(e) => {
															setProduct({ ...product, type: eachType[0] });
														}}
													/>
												)
											);
										})}
									</div>
								</Form.Group>
								<Form.Group
									className='mb-3 col-md-5 d-flex flex-column align-items-start'
									controlId='formBasicProductPrice'
								>
									<Form.Label>
										{languages[0][lang].createProduct.price}
									</Form.Label>
									<InputGroup className='mb-3'>
										<InputGroup.Text>{business.currency}</InputGroup.Text>
										<Form.Control
											type='number'
											placeholder={languages[0][lang].createProduct.pricePh}
											name='price'
											value={product.price}
											onChange={(e) => {
												setProduct({
													...product,
													[e.target.name]: e.target.value,
												});
											}}
										/>
									</InputGroup>
								</Form.Group>
							</div>
							<div className='d-flex justify-content-between'>
								<Form.Group className='mb-3 col-md-5 d-flex flex-column align-items-start'>
									<Form.Label>
										{languages[0][lang].createProduct.status}
									</Form.Label>
									<Form.Control
										as='select'
										value={product.status}
										onChange={(e) => {
											setProduct({ ...product, status: e.currentTarget.value });
										}}
									>
										<option value='active'>
											{languages[0][lang].createProduct.active}
										</option>
										<option value='paused'>
											{languages[0][lang].createProduct.paused}
										</option>
									</Form.Control>
								</Form.Group>
								<Form.Group className='mb-3 col-md-6 d-flex flex-column align-items-start'>
									<Form.Label>
										{languages[0][lang].createProduct.weight}
									</Form.Label>
									<Form.Control
										type='number'
										placeholder={languages[0][lang].createProduct.weightPh}
										name='weight'
										value={product.weight}
										onChange={(e) => {
											setProduct({
												...product,
												[e.target.name]: e.target.value,
											});
										}}
									/>
								</Form.Group>
							</div>

							<Form.Group
								className='mb-3 d-flex flex-column align-items-start'
								controlId='formBasicProductCategories'
							>
								<Form.Label>
									{languages[0][lang].createProduct.categories}
								</Form.Label>
								<Form.Label className='card p-2 col-12 d-flex flex-row'>
									{product.categories.map((cat) => {
										return (
											<span
												key={uuidv4()}
												name={cat}
												className='badge rounded-pill bg-success m-1'
												onClick={(e) => {
													let newCategories = product.categories.filter(
														(cat) => {
															return cat !== e.target.innerText;
														}
													);
													setProduct({ ...product, categories: newCategories });
												}}
											>
												{cat}
											</span>
										);
									})}
								</Form.Label>

								<Form.Control
									type='text'
									placeholder={languages[0][lang].createProduct.categoriesPh}
									value={menucategoriessearch}
									onChange={(e) => {
										setmenucategoriessearch(e.target.value);
										if (e.target.value[e.target.value.length - 1] === ',') {
											setProduct({
												...product,
												categories: [
													...product.categories,
													e.target.value.split(',')[0],
												],
											});
											setmenucategoriessearch('');
										}
									}}
								/>
								<div className='d-flex flex-column align-items-start'>
									{menucategoriessearch !== '' &&
										business.categories
											.filter((category) => {
												return category
													.toLowerCase()
													.includes(menucategoriessearch.toLocaleLowerCase());
											})
											.map((category, i) => {
												return (
													!product.categories.includes(category) && (
														<div
															key={uuidv4()}
															onClick={(e) => {
																setProduct({
																	...product,
																	categories: [
																		...product.categories,
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

							<Form.Group
								className='mb-3 d-flex flex-column align-items-start'
								controlId='formBasicProductIngredients'
							>
								<Form.Label>
									{languages[0][lang].createProduct.ingredients}
								</Form.Label>
								<Form.Label className='card p-2 col-12 d-flex flex-row'>
									<br />
									{product.ingredients.map((cat) => {
										return (
											<span
												key={uuidv4()}
												name={cat}
												className='badge rounded-pill bg-danger m-1'
												onClick={(e) => {
													let newCategories = product.ingredients.filter(
														(cat) => {
															return cat !== e.target.innerText;
														}
													);
													setProduct({
														...product,
														ingredients: newCategories,
													});
												}}
											>
												{cat}
											</span>
										);
									})}
								</Form.Label>
								<Form.Control
									type='text'
									placeholder={languages[0][lang].createProduct.ingredientsPh}
									value={productingredientsearch}
									onChange={(e) => {
										setproductingredientsearch(e.target.value);
										if (e.target.value[e.target.value.length - 1] === ',') {
											setProduct({
												...product,
												ingredients: [
													...product.ingredients,
													e.target.value.split(',')[0],
												],
											});
											setproductingredientsearch('');
										}
									}}
								/>
							</Form.Group>
							{errorMessage && <p className='text-danger'>{errorMessage}</p>}

							<Button
								variant='primary'
								size='lg'
								type='submit'
								className='mx-2 my-1 col-8 col-md-4'
							>
								{languages[0][lang].createProduct.btnCreate}
							</Button>
						</Form>
					</div>
				</div>
				<Modal
					show={showModal}
					onHide={handleCloseModal}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							{languages[0][lang].createProduct.modalTitle}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{languages[0][lang].createProduct.modalText1} <br />
						<br />
						{languages[0][lang].createProduct.modalText2}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={handleCloseModal}>
							{languages[0][lang].createProduct.modalBtn}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
	return (
		<div className='flex-grow-1'>
			<Loading />
		</div>
	);
};

export default CreateProduct;
