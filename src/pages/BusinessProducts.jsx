import { useState, useContext, useEffect } from 'react';
import {  useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProductCard from '../components/ProductCard';
import ProductCardDesktop from '../components/ProductCardDesktop';

import iconsCloud from '../data/icons.json'
import Loading from '../components/Loading';

const BusinessProducts = () => {
    const { user } = useContext(AuthContext);
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')

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
                const errorDescription = error;
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
        if(business.owner !== user._id){
            navigate('/')
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
                            <Link className='m-2' to={`/${businessNameEncoded}/dashboard`}><span className="shadow m-2 "><img src={iconsCloud[0].backIcon} alt="backIcon" width={35}/></span></Link>
                            
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
                        <Button variant='outline-primary' size='lg' className='col-6 col-md-2 m-2' href={`/${businessNameEncoded}/create-product`}> ➕ Add Product</Button>
                    </div>
                </div>
                <div className="row p-0 justify-content-center">

                {window.innerWidth < 450 ? 
                    <div className="col-12 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.map(product =>{
                            return <ProductCard key={uuidv4()} currency={currency} product={product} setBusiness={setBusiness} businessNameEncoded={businessNameEncoded} handleModal={handleModal}/>
                        })}
                    </div> : 
                    <div className=" col-md-10 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.map(product =>{
                            return <ProductCardDesktop key={uuidv4()} currency={currency} product={product} setBusiness={setBusiness} businessNameEncoded={businessNameEncoded} handleModal={handleModal}/>
                        })}
                    </div>}
                    
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

export default BusinessProducts