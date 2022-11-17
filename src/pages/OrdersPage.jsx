import { useContext,useState } from 'react';
import { CartContext } from '../context/cart.context';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import OrderCard from '../components/OrderCard';

import { v4 as uuidv4 } from 'uuid';
import Loading from '../components/Loading';
import OrderStatus from '../components/OrderStatus';

const OrdersPage = () => {
    const initialState = {
        show: false,
        contact:'seller',
        msg:'',
        order:''
    }
    const [show, setShow] = useState(initialState);
    
    const [status, setStatus] = useState('All Orders')

    const statues = ['All Orders','Pending','Payed','Confirmed','Cancelled']
    
    const { user, setUSer } = useContext(CartContext);
    
    const storedToken = localStorage.getItem("authToken"); 
    const handleCancelOrder = (order)=>{
        const requestBody = {
            status:'cancelled'
        } 

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/orders/status/${order._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                // If the server verifies that JWT token is valid  
                const user = response.data;;
               // Update state variables        
                
                setUSer(user); 
            })
            .catch((error) => {
                console.log(error)
            });
    }
    
    const handleClose = () => setShow(false);
    const handleModal = (msg,order,contact) => {
        setShow({...show,show:true,msg,order,contact})
    }

    if (user) {
        return <div className='container p-0'>
            <div className="row d-flex flex-row rounded border border-light">
                <div className="col-12 col-md-10">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 form-control">
                        <h1>Hi, {user.username}</h1>
                        <h3>These are your Orders:</h3>
                        <OrderStatus statues={statues} setStatus={setStatus} status={status}/>
                        <div className="col-12 cartProducts">
                               {user.orders.map(order=>{
                                return<OrderCard key={uuidv4()} order={order} handleCancelOrder={handleCancelOrder} handleModal={handleModal} />
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
            <div><Loading/></div>
        )
    }
}

export default OrdersPage