import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'
import axios from 'axios';

import { toast } from 'react-toastify';

import iconsCloud from '../data/icons.json'

const ProductCard = ({product}) => {
    // console.log(window.innerWidth)
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);

    const storedToken = localStorage.getItem("authToken"); 
    
    const [added, setAdded] = useState(0)

    const handleAddToCart = () =>{
        const requestBody = {
            update:'cart',
            cart:{
                product:product._id,
                quantity:added
            }
        } 
        axios
			.put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
			.then(() => {
		        toast.success('Item(s) added to Cart', { theme: 'dark' });
                getCartData()
                setAdded(0)
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
                toast.error(errorDescription, { theme: 'dark' });
			});
    }

  return (
    <div className='rounded d-flex flex-column card col-5 align-items-center justify-content-between m-1 shadow'>
        <div className="p-2 rounded-circle border border-dark d-flex justify-items-center mt-2 shadow-sm " 
            style={{  
                height: '100px',
                width: '100px',
                backgroundImage: `url('${product.mainImg}')`,    
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
        </div>
        <dir className='p-0 m-1'>
            <p className='p-1 m-0' style={{fontSize:'0.95em', fontWeight:'bolder'}}>{product.name}</p>
            <p className='text-bold m-0'>$ {product.price.toFixed(2)}</p>
            
        </dir>
        <div className="mb-2">
            {added === 0 ? 
                <span className="p-1">
                    <img src={iconsCloud[0].addIcon} alt="" width={25} onClick={()=>{setAdded(1)}}/>
                </span> 
                :
                <p>
                    <span className="badge rounded-pill bg-success">
                        <span className="p-1" onClick={()=>{setAdded(added-1)}}>-</span>
                        <span className="p-1">{added}</span>
                        <span className="p-1" onClick={()=>{setAdded(added+1)}}>+</span>
                        
                    </span>
                    <span className="p-1">
                        <img src={iconsCloud[0].addToCart} alt="" width={20} onClick={handleAddToCart}/>
                    </span>
                </p>
            }
        </div>
    </div>
  )
}

export default ProductCard