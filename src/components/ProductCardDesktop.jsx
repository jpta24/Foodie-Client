import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { toast } from 'react-toastify';

import iconsCloud from '../data/icons.json'

const ProductCardDesktop = ({product,businessNameEncoded,currency,cart}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);

    const storedToken = localStorage.getItem("authToken"); 

    const handleAddQtyToCart = () =>{
        const requestBody = {
            cart:{
                product:product._id,
            }
        } 
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users/addQtyCart/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                getCartData()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleAddToCart = () =>{
        if(user){
            if(cart.map(prod=>prod.product._id).includes(product._id)){
                handleAddQtyToCart()
            } else {
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
            }
            
        } else {
           navigate(`/login/${businessNameEncoded}`)
        }
    }
  return (
    <div className='rounded d-flex flex-row card col-4 align-items-center justify-content-between m-1 shadow'>
        <div className="col-4 m-2 ">
            <div className="p-2 rounded-circle border border-dark d-flex justify-items-center m-auto" 
                style={{  
                    height: '100px',
                    width: '100px',
                    backgroundImage: `url('${product.mainImg}')`,    
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
            </div>
        </div>
        <div className="p-1 col-7 d-flex flex-column justify-content-between">
            <dir className='p-0 m-1'>
                <p className='p-1 m-0 text-start' style={{fontSize:'0.95em', fontWeight:'bolder'}}>{product.name}</p>
                <p className='p-1 m-0 text-start' style={{fontSize:'0.8em'}}>{product.description}</p>
                <p className='text-bold m-0'>{currency} {product.price.toFixed(2)}</p>
                
            </dir>
            <div className="mb-2">
                <span style={{cursor:"pointer"}} className="p-1">
                    <img src={iconsCloud[0].addIcon} alt="" width={25} onClick={handleAddToCart}/>
                </span> 
            </div>
        </div>
    </div>
  )
}

export default ProductCardDesktop