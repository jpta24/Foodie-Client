import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Button,Form } from 'react-bootstrap';

import CartCard from '../components/CartCard';

import { v4 as uuidv4 } from 'uuid';
import PayMethod from '../components/PayMethod';
import iconsCloud from '../data/icons.json'
import Loading from '../components/Loading';
import FormatDelivery from '../components/FormatDelivery';


const CartPage = () => {
    const { user } = useContext(AuthContext);
    const { cart,setCart } = useContext(CartContext);
	const navigate = useNavigate();

    const [summary, setSummary] = useState(0)

    const updateSummary =()=>{
        const arrSubtotalElem = document.querySelectorAll('.subtotal')
        let arrSubtotal =[]
        for (let i = 0; i < arrSubtotalElem.length; i++) {
            arrSubtotal.push(+arrSubtotalElem[i].innerText.split(' ')[1])    
        }
        setSummary(arrSubtotal.reduce((acc,val)=>{return acc+val}))
    }
    
    let buzs
    // let businessArray = []
    // const [businesses, setBusinesses] = useState([])

    // if(cart){
    //     const businessIdArr = cart.map(prod => {
    //         return prod.product.business
    //     });
    //     buzs = [...new Set(businessIdArr)]
    //     const storedToken = localStorage.getItem("authToken"); 

    //     buzs.forEach(buzID=>{
    //         axios.get(`${process.env.REACT_APP_SERVER_URL}/business/id/${buzID}`,{headers: {Authorization: `Bearer ${storedToken}`}})
    //     .then(response=>{
    //         console.log(response.data.business)
    //         businessArray.push(response.data.business)
    //     })
    //     .catch((error) => {
    //         console.log({error});
    //         // eslint-disable-next-line no-lone-blocks
    //         {window.innerWidth < 450 ? 
    //           toast.error("Sorry Internal Error !", {
    //               position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
    //           }) : toast.error('Sorry Internal Error', { theme: 'dark' });}
    //         })
    //     })

    //     console.log(businessArray);    
    // }
    
    

    const initialState = {
        cash: false,
        card: false,
        pp: false
    }

    const updatedPayment = {...initialState,cash:true}

    const [payment, setPayment] = useState(updatedPayment)

    const initialAddress ={
        street:'',
        name:'',
        note:'',
        phone:''
    }

    const handleChange = (paymentClicked) => {
        const newState = {...initialState}
        newState[paymentClicked]= true
        setPayment(newState)
    }

    const [address, setAddress] = useState(initialAddress)

    const initialDelivery = {
        delivery:false,
        pickup: false,
        inplace: false
    }

    const updatedDelivery = {...initialDelivery,delivery:true}
    
    const [delivery, setDelivery] = useState(updatedDelivery)

    const handleChangeFormat = (formatDeliveryClicked) => {
        const newState = {...initialDelivery}
        newState[formatDeliveryClicked]= true
        setDelivery(newState)
    }


    const handlePlaceOrder =()=>{
        const storedToken = localStorage.getItem("authToken"); 

        let payMethod = ''
        
        Object.entries(payment).forEach(each =>{
            if(each[1]){
                payMethod = each[0]
            }
        })

        let deliveryFormat = ''
        
        Object.entries(delivery).forEach(each =>{
            if(each[1]){
                deliveryFormat = each[0]
            }
        })
        
        const orders =[]
        
        buzs.forEach(buz=>{
            return orders.push({
                business: buz,
                user:user._id,
                status:'pending',
                paymentMethod:payMethod,
                format:deliveryFormat,
                products:[],
                note: address,
                summary:summary
            })
        })
        orders.forEach(each=>{
            cart.forEach(elem=>{
                if (each.business === elem.product.business) {
                    each.products.push({
                        product:elem.product._id,
                        quantity:elem.quantity
                    })
                }
            })
        })
        console.log(orders)

		const requestBody = {
            update:'order',
            orders
        } 

        axios
			.put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
			.then((response) => {
                // eslint-disable-next-line no-lone-blocks
                {window.innerWidth < 450 ? 
                    toast.success("Order Placed !", {
                        position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    }) : toast.success('Order Placed', { theme: 'dark' });}
                setCart(null)
                navigate(`/orders/${user._id}`)
			})
			.catch((error) => {
                console.log({error});
				const errorDescription = error.response.data.message;
                console.log(errorDescription);
                // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error("Order could not be placed !", {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error('Order could not be placed', { theme: 'dark' });}
			});
    }


    if(user && cart){
    const allIds = cart.map(elem =>elem.product._id)
    const cartProdIds = []
    const renderCart = []

    for (let i = 0; i < cart.length; i++) {
        if (cartProdIds.includes(cart[i].product._id)) {

            const filteredElem = renderCart.filter(elem=>{
                return cart[i].product._id === elem.product._id
            })
            let qty = 0
            allIds.forEach(elem=>{
                if(elem === cart[i].product._id){
                    qty += 1
                }
            })
            filteredElem[0].quantity = qty                  
        }else{
            cartProdIds.push(cart[i].product._id)
            renderCart.push(cart[i])
        }
        
    }   
    
        return (
            <div className='container p-0'>
                <div className="row d-flex flex-row rounded border border-light">
                    <div className="col-12 col-md-7">
                        <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                            <h1>Hi, {user.username}</h1>
                            <h3>{cart.length===0?'Your Cart is Empty!':'This is your Cart'}</h3>
                            <div className="col-12 cartProducts">
                                {renderCart.map(product => {
                                return <CartCard key={uuidv4()} product={product} updateSummary={updateSummary} />
                                })}
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                    <div className="col-11 d-flex flex-column p-2 mt-2 py-3 form-control bg-success cartSummary">
                            <h2 className='fw-bold text-light'> Summary: € {summary.toFixed(2)}</h2>

                            <h4>Delivery Format</h4>
                            <div className='d-flex px-2 mx-2 justify-content-around'>
                                <FormatDelivery onclick={()=>{handleChangeFormat('delivery')}} src={delivery.delivery ? iconsCloud[0].deliveryActive: iconsCloud[0].deliveryInactive}/>
                                <FormatDelivery onclick={()=>{handleChangeFormat('pickup')}} src={delivery.pickup ? iconsCloud[0].pickupActive: iconsCloud[0].pickupInactive}/>
                                <FormatDelivery onclick={()=>{handleChangeFormat('inplace')}} src={delivery.inplace ? iconsCloud[0].inplaceActive: iconsCloud[0].inplaceInactive}/>
                            </div>  

                            <div className='d-flex flex-column justify-content-between mb-2 '>
                                <div className="d-flex">
                                    <Form.Group
                                        className='mb-1 col-6 px-2 d-flex flex-column align-items-start'
                                        controlId='formBasicAddressName'
                                    >
                                        <Form.Label className='mb-0'>Name</Form.Label>
                                        <Form.Control
                                            className='py-0'
                                            type='text'
                                            placeholder='Recipient'
                                            name='name'
                                            value={address.name}
                                            onChange={(e) => {
                                                setAddress({...address, [e.target.name]:e.target.value});
                                            }}
                                        />
                                        
                                    </Form.Group>
                                    <Form.Group
                                        className='mb-1 col-6 px-2 d-flex flex-column align-items-start'
                                        controlId='formBasicphone'
                                    >
                                        <Form.Label className='mb-0'>Phone</Form.Label>
                                        <Form.Control
                                            className='py-0'
                                            type='tel'
                                            placeholder='add a phone number'
                                            name='phone'
                                            value={address.phone}
                                            onChange={(e) => {
                                                setAddress({...address, [e.target.name]:e.target.value});;
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                                

                                <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicAddressStreet'
                                >
                                    <Form.Label className='mb-0'>Address</Form.Label>
                                    <Form.Control
                                        className='py-0'
                                        type='text'
                                        placeholder='Street, building number and Floor'
                                        name='street'
                                        value={address.street}
                                        onChange={(e) => {
                                            setAddress({...address, [e.target.name]:e.target.value});;
                                        }}
                                    />
                                </Form.Group>
                                
                                 <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicNote'
                                >
                                    <Form.Label className='mb-0'>Note</Form.Label>
                                    <Form.Control
                                        className='py-0'
                                        type='text'
                                        placeholder='add any note, if need it'
                                        name='note'
                                        value={address.note}
                                        onChange={(e) => {
                                            setAddress({...address, [e.target.name]:e.target.value});;
                                        }}
                                    />
                                </Form.Group>
                            </div>   

                            <h4>Payment Method</h4>
                            <div className='d-flex px-2 mx-2 justify-content-around'>
                                <PayMethod onclick={()=>{handleChange('cash')}} src={payment.cash ? iconsCloud[0].cashActive: iconsCloud[0].cashInactive}/>
                                <PayMethod onclick={()=>{handleChange('card')}} src={payment.card ? iconsCloud[0].cardActive: iconsCloud[0].cardInactive}/>
                                <PayMethod onclick={()=>{handleChange('pp')}} src={payment.pp ? iconsCloud[0].ppActive: iconsCloud[0].ppInactive}/>
                            </div>


                            
                            <div className="col-12">
                            {cart.length!==0 && <Button variant='primary' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-6' onClick={handlePlaceOrder}>
                                    Place your Order!
                                </Button>}
                                
                                
                            </div>

                        </div>
                    </div>
                    
                    

                </div>
            </div>
        )
    }else if(cart===null){
        <div className='container p-0'>
            <div className="row d-flex flex-row rounded border border-light">
                <div className="col-12 col-md-7">
                    <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                        <h1>Hi, {user.username}</h1>
                        <h3>Your Cart is Empty!</h3>
                    </div>
                </div>
            </div>
        </div>
    }else{
        return (
            <div><Loading/></div>
        )
    }
    
  
}

export default CartPage