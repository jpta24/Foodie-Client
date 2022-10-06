import { useContext, useState } from 'react';

import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';

import { Button,Form } from 'react-bootstrap';

import CartCard from '../components/CartCard';

import { v4 as uuidv4 } from 'uuid';
import PayMethod from '../components/PayMethod';
import iconsCloud from '../data/icons.json'


const CartPage = () => {
    const { user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
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
    const initialAddress ={
        street:'',
        name:'',
        note:'',
        phone:''
    }

    const [rol, setRol] = useState(initialState)
    const [address, setAddress] = useState(initialAddress)

    const handleChange = (rolClicked) => {
        const newState = {...initialState}
        newState[rolClicked]= true
        // console.log(newState)
        setRol(newState)
    }
    
    

    if(user && cart){
        
        return (
            <div className='container p-0'>
                <div className="row d-flex flex-row rounded border border-light">
                    <div className="col-12 col-md-7">
                        <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                            <h1>Hi, {user.username}</h1>
                            <h3>This is your Cart</h3>
                            <div className="col-12 cartProducts">
                                {cart.map(product => {
                                return <CartCard key={uuidv4()} product={product} updateSummary={updateSummary}/>
                                })}
                            </div>

                        </div>
                    </div>
                    {window.innerWidth > 400 ? <div className="col-12 col-md-5">
                    <div className="col-11 d-flex flex-column p-2 mt-2 py-3 form-control bg-success">
                            <h2>Payment Method</h2>
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
                            


                            <h4> Summary: € {summary}</h4>
                            <div className="col-12">
                                <Button variant='primary' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-6' onClick={updateSummary}>
                                    Place your Order!
                                </Button>
                                
                            </div>

                        </div>
                    </div>
                    : 
                    <div>

                    </div> }
                    

                </div>
            </div>
        )
    }else{
        return (
            <div>Loading...</div>
        )
    }
    
  
}

export default CartPage