import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'

const CartCard = ({product,updateSummary}) => {
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);

    const storedToken = localStorage.getItem("authToken"); 
    const handleAddToCart = () =>{
        const requestBody = {
            update:'cart',
            cart:{
                product:product.product._id,
                quantity:1
            }
        } 
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                getCartData()
            })
            .catch((error) => {
                console.log(error)
            });
        
    }
    const handleRemoveToCart = () =>{
        const requestBody = {
            update:'removeCart',
            cart:{
                product:product._id,
            }
        } 
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                getCartData()
            })
            .catch((error) => {
                console.log(error)
            });
        
    }

    useEffect(() => {
        updateSummary()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  return (
    <div className='rounded d-flex flex-row card col-11 mx-auto align-items-center justify-content-between shadow'>
        <div className="col-2 m-2 ">
            <div className="p-2 rounded border border-dark d-flex justify-items-center m-auto" 
                style={{  
                    height: '60px',
                    width: '60px',
                    backgroundImage: `url('${product.product.mainImg}')`,    
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
            </div>
        </div>
        <div className="p-1 col-5 d-flex flex-column justify-content-between">
            <dir className='p-0 m-1'>
                <p className='p-1 m-0 text-start' style={{fontSize:'0.95em', fontWeight:'bolder'}}>{product.product.name}</p>
                <p className='text-bold m-0 text-start'>€ {product.product.price.toFixed(2)}</p>
                
            </dir>
            <div className="mb-1">
                <p className='mb-1'>
                    <span style={{cursor:"pointer"}} className="badge rounded-pill bg-success">
                        <span className="p-1" onClick={()=>{handleRemoveToCart()}}>-</span>
                        <span className="p-1">{product.quantity}</span>
                        <span className="p-1" onClick={()=>{handleAddToCart()}}>+</span>
                    </span>
                </p>
            </div>
        </div>
        <div className="m-1 col-1">
            <h3>{product.quantity}</h3>
        </div>
        <div className="m-1 col-3">
            <h3 className='subtotal fs-4'>€ {(product.quantity * product.product.price).toFixed(2)}</h3>
        </div>
    </div>
  )
}

export default CartCard