import { useContext, useState } from 'react';

import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';

import { Button } from 'react-bootstrap';

import CartCard from '../components/CartCard';

import { v4 as uuidv4 } from 'uuid';


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
    
    

    if(user && cart){
        
        return (
            <div className='container p-0'>
                <div className="row d-flex flex-row rounded border border-light">
                    <div className="col-12 col-md-7">
                        <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                            <h1>Hi, {user.username}</h1>
                            <h3>This is your Cart</h3>
                            <div className="col-12">
                                {cart.map(product => {
                                return <CartCard key={uuidv4()} product={product} updateSummary={updateSummary}/>
                                })}
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                    <div className="col-11 d-flex flex-column p-2 mt-2 form-control">
                            <h2>Payment Method</h2>
                            <h4> Summary: € {summary}</h4>
                            <div className="col-12">
                                <Button variant='primary' size="lg" type='submit' className='mx-2 my-1 col-8 col-md-6' onClick={updateSummary}>
                                    Place your Order!
                                </Button>
                                
                            </div>

                        </div>
                    </div>

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