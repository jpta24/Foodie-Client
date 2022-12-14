import { useState, useContext,useEffect } from 'react';
import {  useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Form, InputGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import iconsCloud from '../data/icons.json'
import Loading from '../components/Loading';

const EditProduct = () => {
    const { user } = useContext(AuthContext);
    const { businessName, productID } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

	const [errorMessage, setErrorMessage] = useState(undefined);

    const [product, setProduct] = useState('')

    const [menucategoriessearch, setmenucategoriessearch] = useState('')
    
    const [productingredientsearch, setproductingredientsearch] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${productID}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setProduct(response.data.product)
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

    const handleEditProduct = (e) => {
		e.preventDefault();
        const storedToken = localStorage.getItem("authToken"); 

		// Create an object representing the request body
		const requestBody = product;

		// Make an axios request to the API
		// If POST request is successful redirect to Business/Dashboard page
		// If the request resolves with an error, set the error message in the state
		axios
			.put(`${process.env.REACT_APP_SERVER_URL}/products/edit/${product._id}`, requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
			.then(() => {
                navigate(`/${businessNameEncoded}/products`)
			})
			.catch((error) => {
                console.log({error});
				const errorDescription = error.response.data.message;
                // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error("Product could not be Edited !", {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error('Product could not be Edited', { theme: 'dark' });}
				setErrorMessage(errorDescription);
			});
	};

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
            setProduct({...product, [field]:response.fileUrl});
            
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
    
      if (product!=='') {
        if(product.business.owner !== user._id){
            navigate('/')
        }
        
        return (
            <div className='container-fluid'>
                <div className="row p-0">
                    <div className="d-flex flex-column align-items-center justify-content-between" 
                    style={{  
                        backgroundImage: `url('${product.business.bgUrl}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '150px'
                    }}>
                        <div className='d-flex col-12 justify-content-start'>
                            <Link className='m-2' to={`/${businessNameEncoded}/products`}><span className="bg-dark rounded-circle border m-2 "><img src={iconsCloud[0].backIcon} alt="backIcon" width={35}/></span></Link>
                            
                        </div>
                        <div className='d-flex justify-content-center align-items-end'>
                            <div className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center' style={{  
                            height: '90px',
                            width: '90px'
                            }}>
                                <img src={product.business.logoUrl} alt='altLogo' width={65}  /> 
                            </div>
                        </div>
                        
                    </div>
                </div>
                <h1>{product.business.name}</h1>
                <h3>Edit the fields you need!</h3>
                <div className='row justify-content-center p-4 mb-4'>
				    <div className='col-md-8 '>
                        <Form onSubmit={handleEditProduct}>
                        <div className="col-4 m-2 mx-auto">
                            <div className={`p-2 rounded-circle border border-dark d-flex justify-items-center m-auto $`} 
                                style={{  
                                    height: '100px',
                                    width: '100px',
                                    backgroundImage: `url('${product.mainImg === '' ? iconsCloud[0].noImageIcon  : product.mainImg}')`,    
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                            </div>
                        </div>
                            <div className='d-md-flex justify-content-md-between'>
                                <Form.Group
                                    className='mb-3 col-md-6 d-flex flex-column align-items-start'
                                    controlId='formBasicProductName'
                                >
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter a Name for the Product'
                                        name='name'
                                        value={product.name}
                                        onChange={(e) => {
                                            setProduct({...product, [e.target.name]:e.target.value});
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className='mb-3 col-md-5 d-flex flex-column align-items-start'
                                    controlId='formBasicProductName'
                                >
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        type='file'
                                        onChange={(e) => handleFileUpload(e,'mainImg')}
                                    />
                                </Form.Group>
                            </div>

                            <div className='d-md-flex justify-content-md-between'>
							<Form.Group
								className='mb-3 col-12 d-flex flex-column align-items-start'
								controlId='formBasicProductName'
							>
								<Form.Label>Description</Form.Label>
								<Form.Control
                                    as="textarea" 
                                    rows={3}
									type='text'
									placeholder='Enter a Name for the Product'
									name='description'
									value={product.description}
									onChange={(e) => {
										setProduct({...product, [e.target.name]:e.target.value});
									}}
								/>
							</Form.Group>
						</div>
                        <div className='d-flex justify-content-around'>
                            <Form.Group
								className='mb-3 col-md-5 d-flex flex-column'
								controlId='formBasicBusinessCountry'
							>
                                <Form.Label>Product Types</Form.Label>
                                    <div>
                                        {Object.entries(product.business.type).map(eachType => {
                                            return eachType[1] && (<Form.Check
                                            inline
                                            key={uuidv4()}
                                            label={eachType[0][0].toUpperCase() + eachType[0].slice(1)}
                                            name={eachType[0]}
                                            type='radio'
                                            id={`inline-$'radio'-1`}
                                            checked={eachType[0]===product.type}
                                            onChange={(e)=>{
                                            setProduct({...product, type : eachType[0] })
                                            }}
                                        />)
                                        })}
                                    
                                    </div>
                            </Form.Group>
                            <Form.Group
								className='mb-3 col-md-5 d-flex flex-column align-items-start'
								controlId='formBasicProductPrice'
							>
								<Form.Label>Price</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>{product.business.currency}</InputGroup.Text>
                                    <Form.Control
									type='number'
									placeholder='use dot for decimals'
									name='price'
									value={product.price}
									onChange={(e) => {
										setProduct({...product, [e.target.name]:e.target.value});
									}}
								/>
                                </InputGroup>
								
							</Form.Group>
                        </div>
                        <Form.Group className='mb-3 col-md-5 d-flex flex-column align-items-start'>
                            <Form.Label >Product Status</Form.Label>
                            <Form.Control
                                as="select" value={product.status} onChange={(e) =>{
                                setProduct({...product,status:e.currentTarget.value})}}>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group
                            className='mb-3 d-flex flex-column align-items-start'
                            controlId='formBasicProductCategories'
                        >
							<Form.Label>Product Categories</Form.Label>
                            <Form.Label className='card p-2 col-12 d-flex flex-row'>
                            {product.categories.map(cat => {
                                return <span key={uuidv4()} name={cat} className="badge rounded-pill bg-success m-1" onClick={(e) => {
                                        let newCategories = product.categories.filter(cat=>{
                                        return cat !== e.target.innerText
                                        })
                                        setProduct({...product,categories:newCategories})
                                    }}>{cat}</span>
                            })}
                            </Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='Ex: Specialties, Snacks, Dessert, Drinks, etc'
                                value={menucategoriessearch}
                                onChange={(e)=>{
                                    setmenucategoriessearch( e.target.value )
                                    if(e.target.value[e.target.value.length - 1] === ','){
                                        setProduct({...product,categories:[...product.categories,e.target.value.split(',')[0]]})
                                        setmenucategoriessearch('')
                                    }
                                }}
                            />
                            <div className="d-flex flex-column align-items-start">
                            {menucategoriessearch!=='' && (product.business.categories.filter(category=>{
                                return (category.toLowerCase().includes(menucategoriessearch.toLocaleLowerCase()) )
                                })
                                .map((category,i) => {
                                    return(!product.categories.includes(category) && 
                                    <div
                                    key={uuidv4()}
                                        onClick={(e) => {
                                        setProduct({...product,categories:[...product.categories,e.target.innerText]})
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

                        <Form.Group
                            className='mb-3 d-flex flex-column align-items-start'
                            controlId='formBasicProductIngredients'
                        >
							<Form.Label>Product Ingredientes</Form.Label>
                            <Form.Label className='card p-2 col-12 d-flex flex-row' ><br/>
                            {product.ingredients.map(cat => {
                                return <span key={uuidv4()} name={cat} className="badge rounded-pill bg-danger m-1" onClick={(e) => {
                                        let newCategories = product.ingredients.filter(cat=>{
                                        return cat !== e.target.innerText
                                        })
                                        setProduct({...product,ingredients:newCategories})
                                    }}>{cat}</span>
                            })}
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='use "," to add the ingredient'
                                value={productingredientsearch}
                                onChange={(e)=>{

                                    setproductingredientsearch( e.target.value )
                                    if(e.target.value[e.target.value.length - 1] === ','){
                                        setProduct({...product,ingredients:[...product.ingredients,e.target.value.split(',')[0]]})
                                        setproductingredientsearch('')
                                    }
                                }}
                            />
                           
						</Form.Group>
                        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
						
						<Button variant='primary' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-4'>
							Edit Product
						</Button>
                       
                        

                        </Form>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div><Loading/></div>
      )
}

export default EditProduct