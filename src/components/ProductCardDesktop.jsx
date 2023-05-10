import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'
import { Link, useNavigate } from "react-router-dom";

import { getAPI, putAPI } from '../utils/api';
import { toastifyError } from '../utils/tostify';

import iconsCloud from '../data/icons.json'

const ProductCardDesktop = ({product,businessNameEncoded,currency,cart,setBusiness,handleModal,owner}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);
    
    const prodIsActive = product.status === 'paused' ? false : true
    const paused ='⏸'
    const play = '▶'

    const handleAddQtyToCart = () =>{
        const requestBody = {
            cart:{
                product:product._id,
            }
        } 
        const url = `users/addQtyCart/${user._id}`;
		const thenFunction = (response) => {
			getCartData();
		};
		putAPI(url, requestBody, thenFunction);
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
                const url = `users/addCart/${user._id}`
                const thenFunction = (response) =>{
                    getCartData()
                }
                const errorFunction = (error) => {
                    toastifyError(error.response.data.message)
                }
                putAPI(url,requestBody,thenFunction,errorFunction)
            }
            
        } else {
           navigate(`/login/${businessNameEncoded}`)
        }
    }

    const handleProductStatus = () => {
        const newStatus = prodIsActive ? 'paused' : 'active'
        const requestBody = {
            status:newStatus
        } 
        const url = `products/status/${product._id}`
        
        const urlGet = `business/${businessNameEncoded}`
        const thenGetFunction = (response) =>{
            setBusiness(response.data.business)
        }
        const thenFunction = (response) =>{
            getAPI(urlGet,thenGetFunction, errorFunction)
        }
        const errorFunction = (error) => {
            toastifyError(error.response.data.message)
        }
        putAPI(url,requestBody,thenFunction,errorFunction)
    }
  return (
    <div className='rounded d-flex flex-row card col-4 align-items-center justify-content-between m-1 shadow'>
        <div className="col-4 m-2">
            <Link to={`/product/${product._id}`}>
                <div className={`p-2 rounded-circle border border-dark d-flex justify-items-center m-auto ${!prodIsActive && 'opacity-50'}`} 
                style={{  
                    height: '100px',
                    width: '100px',
                    backgroundImage: `url('${product.mainImg}')`,    
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                </div>
            </Link>
            
        </div>
        <div className="p-1 col-7 d-flex flex-column justify-content-between">
            <dir className='p-0 m-1'>
                <div className={`p-0 m-0 ${owner === false && 'd-none'} text-end`}>
                    <span style={{cursor:"pointer"}} className='mx-1' onClick={handleProductStatus}>{prodIsActive ? paused : play}</span>
                    <Link to={`/${businessNameEncoded}/edit-product/${product._id}`}><span style={{cursor:"pointer"}}  className='mx-1'>🖊</span></Link>
                    <span style={{cursor:"pointer"}} className='mx-1' 
                    onClick={()=>{handleModal(product.name,product._id)}}
                    >❌</span>
                </div>
                <p className={`p-1 m-0 text-start ${!prodIsActive && 'opacity-50'}`} style={{fontSize:'0.95em', fontWeight:'bolder'}}>{product.name}</p>
                <p className={`p-1 m-0 text-start ${!prodIsActive && 'opacity-50'}`} style={{fontSize:'0.8em'}}>{product.description}</p>
                <p className={`text-bold m-0 ${!prodIsActive && 'opacity-50'}`}>{currency} {product.price.toFixed(2)}</p>
                
            </dir>
            <div className="mb-2">
                <span style={{cursor:"pointer"}} className={`p-1 m-0 ${!prodIsActive && 'opacity-50'}`}>
                    <img src={iconsCloud[0].addIcon} alt="" width={25} onClick={handleAddToCart}/>
                </span> 
            </div>
        </div>
    </div>
  )
}

export default ProductCardDesktop