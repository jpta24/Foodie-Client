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
        // console.log(arrSubtotal.reduce((acc,val)=>{return acc+val}))
    }

    const initialState = {
        cash: false,
        card: false,
        pp: false
    }
    
    const updatedRol = {...initialState,cash:true}

    const initialAddress ={
        street:'',
        name:'',
        note:'',
        phone:''
    }

    const [rol, setRol] = useState(updatedRol)
    const [address, setAddress] = useState(initialAddress)

    const handleChange = (rolClicked) => {
        const newState = {...initialState}
        newState[rolClicked]= true
        // console.log(newState)
        setRol(newState)
    }

    const handlePlaceOrder =()=>{
        const storedToken = localStorage.getItem("authToken"); 

        let payMethod = ''
        
        Object.entries(rol).forEach(each =>{
            if(each[1]){
                payMethod = each[0]
            }
        })
        const businessIdArr = cart.map(prod => {
            return prod.product.business
        });
        const buzs = [...new Set(businessIdArr)]
        const orders =[]

        
        buzs.forEach(buz=>{
            return orders.push({
                business: buz,
                user:user._id,
                status:'pending',
                paymentMethod:payMethod,
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
		        toast.success('Order Placed', { theme: 'dark' });
                setCart(null)
                navigate(`/orders/${user._id}`)
			})
			.catch((error) => {
                console.log({error});
				const errorDescription = error.response.data.message;
                console.log(errorDescription);
                toast.error('Order could not be placed', { theme: 'dark' });
			});
    }
    
    

    if(user && cart){
        
        return (
            <div className='container p-0'>
                <div className="row d-flex flex-row rounded border border-light">
                    <div className="col-12 col-md-7">
                        <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                            <h1>Hi, {user.username}</h1>
                            <h3>{cart.length===0?'Your Cart is Empty!':'This is your Cart'}</h3>
                            <div className="col-12 cartProducts">
                                {cart.map(product => {
                                return <CartCard key={uuidv4()} product={product} updateSummary={updateSummary}/>
                                })}
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                    <div className="col-11 d-flex flex-column p-2 mt-2 py-3 form-control bg-success cartSummary">
                            <h2> Summary: € {summary.toFixed(2)}</h2>
                            <h4>Payment Method</h4>
                            <div className='d-flex px-2 m-2 justify-content-around'>
                                <PayMethod onclick={()=>{handleChange('cash')}} src={rol.cash ? iconsCloud[0].userActive: iconsCloud[0].userInactive}/>
                                <PayMethod onclick={()=>{handleChange('card')}} src={rol.card ? iconsCloud[0].adminActive: iconsCloud[0].adminInactive}/>
                                <PayMethod onclick={()=>{handleChange('pp')}} src={rol.pp ? iconsCloud[0].employeeActive: iconsCloud[0].employeeInactive}/>
                            </div>

                            <div className='d-flex flex-column justify-content-between mb-2 '>
                                <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicAddressName'
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Recepitan'
                                        name='name'
                                        value={address.name}
                                        onChange={(e) => {
                                            setAddress({...address, [e.target.name]:e.target.value});
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicAddressStreet'
                                >
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Street and building number'
                                        name='street'
                                        value={address.street}
                                        onChange={(e) => {
                                            setAddress({...address, [e.target.name]:e.target.value});;
                                        }}
                                    />
                                </Form.Group>
                                {/* <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicNote'
                                >
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='add any note if need it'
                                        name='note'
                                        value={address.note}
                                        onChange={(e) => {
                                            setAddress({...address, [e.target.name]:e.target.value});;
                                        }}
                                    />
                                </Form.Group> */}
                                <Form.Group
                                    className='mb-1 col-12 px-2 d-flex flex-column align-items-start'
                                    controlId='formBasicphone'
                                >
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
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
            <div>Loading...</div>
        )
    }
    
  
}

export default CartPage