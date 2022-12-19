import { useState, useEffect, useContext } from 'react';
import {  useParams, useNavigate, Link  } from 'react-router-dom'; 
import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Modal, Button } from 'react-bootstrap';

import { toast } from 'react-toastify';

import ProductCard from '../components/ProductCard';
import ProductCardDesktop from '../components/ProductCardDesktop';

import BusinessMenu from '../components/BusinessMenu';
import Loading from '../components/Loading';

const Business = () => {
    
    const { cart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    let summary
    if (cart!==null && cart.length > 0 ) {
        const amounts = cart.map(item=>item.product.price*item.quantity)
        summary = amounts.reduce((acc,val)=>{return acc+val}).toFixed(2)
    } 
    
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')
    // const [searchProduct, setSearchProduct] = useState('')
    
    
    // let initialMenu = {}
    let arrCategories = []
    if (business.products) {
        business.products.forEach(prod=>{
            prod.categories.forEach(cate=>{
                if(!arrCategories.includes(cate)){
                arrCategories.push(cate) 
                // initialMenu[cate]=false
                } 
            })
        })
    }
    // const updatedCategory = {...initialMenu,General:true}
    const [category, setCategory] = useState( 'General')
    // let activeCategory = 'General'

    const handleCategory = (cat) => {
        // const newCatState = {...initialMenu,[cat]:true}
        setCategory(cat)
    }

    const modalInitialState = {
        show:false,
        productName:'',
        productID:''
    }
    const [show, setShow] = useState(modalInitialState)

    const handleClose = () => setShow(modalInitialState);
    const handleModal = (productName,productID) => {
        setShow({show:true,productName,productID})
    }
    const deleteProduct =()=>{
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/products/delete/${show.productID}`,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                return axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
            }).then(response=>{
                setBusiness(response.data.business)
                setShow(modalInitialState)
            }).catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                toast.error(errorDescription, { theme: 'dark' });
                // eslint-disable-next-line no-lone-blocks
                {window.innerWidth < 450 ? 
                    toast.error(errorDescription, {
                        position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    }) : toast.error(errorDescription, { theme: 'dark' });}
            });
    }
    
    

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

    if (business!=='') {
        let owner = false
        if(user){
            owner = business.owner === user._id ? true : false
        }
        const currency = business.currency
            
        return (
            <div className='container-fluid'>
                <div className="row p-0">
                    <div className="d-flex flex-column align-items-center justify-content-between" 
                    style={{  
                        backgroundImage: `url('${business.bgUrl}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '150px'
                    }}>
                        <div className='d-flex col-12 justify-content-start'>
                            
                            
                        </div>
                        <div className='d-flex justify-content-center align-items-end'>
                            <div className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center' style={{  
                            height: '90px',
                            width: '90px'
                            }}>
                                <img src={business.logoUrl} alt='altLogo' width={65}  /> 
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="row p-0">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1>{business.name}</h1>
                        <BusinessMenu handleCategory={handleCategory} category={category} arrCategories={arrCategories}/>
                    </div>
                </div>
                <div className="row p-0 justify-content-center">

                {window.innerWidth < 450 ? 
                    <div    className="col-12 pb-5 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.filter(prod =>prod.categories.includes(category)).map(product =>{
                            return <ProductCard key={uuidv4()} product={product} businessNameEncoded={businessNameEncoded} currency={currency} cart={cart} setBusiness={setBusiness} handleModal={handleModal} owner={owner}/>
                        })}
                    </div>
                     : 
                    <div className=" col-md-10 pb-5 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.filter(prodAct =>prodAct.status !== 'paused').filter(prod =>prod.categories.includes(category)).map(product =>{
                            return <ProductCardDesktop key={uuidv4()} product={product} businessNameEncoded={businessNameEncoded} currency={currency} cart={cart} setBusiness={setBusiness} handleModal={handleModal} owner={owner}/>
                        })}
                    </div>}
                    {cart && user && cart.length > 0 && 
                        <Link    to={`/cart/${user._id}`} className='fixed-bottom bg-success py-3 text-light fw-bold d-flex justify-content-between'>
                            <span className='px-2 position-relative'>
                                <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
                                {cart.map(prod=>prod.quantity).reduce((acc,val)=>{return acc + val},0)}
                                </span>
                                🛒</span>
                            <span>Go to Cart ({summary} {currency})</span>
                            <span className='px-2'>  </span>
                        </Link>
                         }
                    
                </div>
                <Modal
                    show={show.show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                 >
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {`You are about to delete the "${show.productName}" product this action has no way back.`} <br/>
                    Are you sure, you want to delete it?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }else {
        return (
            <div><Loading/></div>
        )
    }
}

export default Business