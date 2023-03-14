import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {CartContext} from '../context/cart.context'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

import { toast } from 'react-toastify';

import iconsCloud from '../data/icons.json'

const ProductCard = ({product,businessNameEncoded,currency,cart,setBusiness,handleModal,owner}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);

    const prodIsActive = product.status === 'paused' ? false : true
    const paused ='⏸'
    const play = '▶'

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

    const handleProductStatus = () => {
        const newStatus = prodIsActive ? 'paused' : 'active'
        const requestBody = {
            status:newStatus
        } 
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/products/status/${product._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                return axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
            }).then(response=>{
                setBusiness(response.data.business)
            }).catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                toast.error(errorDescription, { theme: 'dark' });
                // eslint-disable-next-line no-lone-blocks
                {window.innerWidth < 450 ? 
                    toast.error(errorDescription, {
                        position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    }) : toast.error(errorDescription, { theme: 'dark' });}
            });
    }

  return (
    <div className='rounded d-flex flex-column card col-5 align-items-center justify-content-between m-1 shadow'>
        <Link to={`/product/${product._id}`}>
            <div className={`p-2 rounded-circle border border-dark d-flex justify-items-center mt-2 shadow-sm ${!prodIsActive && 'opacity-50'}`} 
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
        
        <dir className='p-0 m-1'>
            <div className={`p-0 m-0 ${owner === false && 'd-none'} text-end`}>
                <span style={{cursor:"pointer"}} className='mx-1' onClick={handleProductStatus}>{prodIsActive ? paused : play}</span>
                <Link to={`/${businessNameEncoded}/edit-product/${product._id}`}><span style={{cursor:"pointer"}}  className='mx-1'>🖊</span></Link>
                <span style={{cursor:"pointer"}} className='mx-1' 
                    onClick={()=>{handleModal(product.name,product._id)}}
                    >❌</span>
            </div>
            <p className={`p-1 m-0 ${!prodIsActive && 'opacity-50'}`} style={{fontSize:'0.95em', fontWeight:'bolder'}}>{product.name}</p>
            <p className={`text-bold m-0 ${!prodIsActive && 'opacity-50'}`}>{currency} {product.price.toFixed(2)}</p>
            
        </dir>
        <div className="mb-2">
            <span style={{cursor:"pointer"}} className={`p-1 ${!prodIsActive && 'opacity-50'}`}>
                <img src={iconsCloud[0].addIcon} alt="" width={25} onClick={handleAddToCart}/>
            </span> 
        </div>
    </div>
  )
}

export default ProductCard