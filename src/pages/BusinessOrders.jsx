import { useState,useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
import BusinessOrdersCard from '../components/BusinessOrdersCard';
import Loading from '../components/Loading';
import OrderStatus from '../components/OrderStatus';

const BusinessOrders = () => {
    const initialState = {
        show: false,
        contact:'seller',
        msg:'',
        order:''
    }
    const [show, setShow] = useState(initialState);
  
    // const { user } = useContext(CartContext);
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')

    const [status, setStatus] = useState('All Orders')

    const statues = ['All Orders','Pending','Payed','Confirmed','Cancelled']

    const handleClose = () => setShow(false);
    const handleModal = (msg,order,contact) => {
        setShow({...show,show:true,msg,order,contact})
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

      const handleStatusOrder = (order,status)=>{
        const requestBody = {
            status:status
        } 

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/orders/statusBusiness/${order._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                // If the server verifies that JWT token is valid  
                const businessUpdated = response.data;;
               // Update state variables        
                
                setBusiness(businessUpdated); 
            })
            .catch((error) => {
                console.log(error)
            });
    }


    if (business) {
        return <div className='container p-0'>
            <div className="row d-flex flex-row rounded border border-light">
                <div className="col-12 col-md-10">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 form-control">
                        <h1>Hi, {business.name}</h1>
                        <h3>These are your Orders:</h3>
                        <OrderStatus statues={statues} setStatus={setStatus} status={status}/>
                        <div className="col-12 cartProducts">
                               {business.orders.filter(filt=>{return filt.status===status.toLocaleLowerCase() || status==='All Orders'}).map(order=>{
                                return<BusinessOrdersCard key={uuidv4()} order={order} handleStatusOrder={handleStatusOrder} handleModal={handleModal} />
                               })}
                            </div>
                        
                    </div>
                </div>
            </div>
            <Modal
                show={show.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Contact {show.contact === 'us' ? 'Us' : 'Seller'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {show.msg} {show.order!=='' && show.contact === 'seller' && `${show.order.business.address.email} or ${show.order.business.address.telephone}` }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }else{
        return (
            <div>L<Loading/></div>
        )
    }
}

export default BusinessOrders