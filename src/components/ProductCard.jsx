import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { toast } from 'react-toastify';

import iconsCloud from '../data/icons.json'

const ProductCard = ({product,businessNameEncoded,currency}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);

    const storedToken = localStorage.getItem("authToken"); 

    const handleAddToCart = () =>{
        if(user){
            const requestBody = {
                cart:{
                    product:product._id,
                    quantity:1
                }
            } 
            axios
                .put(`${process.env.REACT_APP_SERVER_URL}/users/addCart/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
                .then(() => {
                    // eslint-disable-next-line no-lone-blocks
                    // {window.innerWidth < 450 ? 
                    //     toast.success("Item(s) added to Cart !", {
                    //         position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    //     }) : toast.success('Item(s) added to Cart', { theme: 'dark' });}
                    getCartData()
                })
                .catch((error) => {
                    const errorDescription = error.response.data.message;
                    toast.error(errorDescription, { theme: 'dark' });
                    // eslint-disable-next-line no-lone-blocks
                    {window.innerWidth < 450 ? 
                        toast.error(errorDescription, {
                            position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                        }) : toast.error(errorDescription, { theme: 'dark' });}
                });
        } else {
           navigate(`/login/${businessNameEncoded}`)
        }
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
            <p className='text-bold m-0'>{currency} {product.price.toFixed(2)}</p>
            
        </dir>
        <div className="mb-2">
            <span className="p-1">
                <img src={iconsCloud[0].addIcon} alt="" width={25} onClick={handleAddToCart}/>
            </span> 
        </div>
    </div>
  )
}

export default ProductCard