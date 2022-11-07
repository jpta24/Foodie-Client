import { useState, useEffect, useContext } from 'react';
import {  useParams, useNavigate, Link  } from 'react-router-dom'; 
import { CartContext } from '../context/cart.context';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

import ProductCard from '../components/ProductCard';
import ProductCardDesktop from '../components/ProductCardDesktop';

import BusinessMenu from '../components/BusinessMenu';
import Loading from '../components/Loading';

const Business = () => {
    
    const { cart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    let summary
    if (cart) {
        // console.log(cart);
        const amounts = cart.map(item=>item.product.price)
        summary = amounts.reduce((acc,val)=>{return acc+val}).toFixed(2)
    } 
    
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')
    
    
    let initialMenu = {}
    let arrCategories = []
    if (business.products) {
        business.products.forEach(prod=>{
            prod.categories.forEach(cate=>{
                if(!arrCategories.includes(cate)){
                arrCategories.push(cate) 
                initialMenu[cate]=false
                } 
            })
        })
    }
    const updatedCategory = {...initialMenu,General:true}
    const [category, setCategory] = useState( updatedCategory)
    let activeCategory = 'General'

    const handleCategory = (cat) => {
        const newCatState = {...initialMenu,[cat]:true}
        setCategory(newCatState)
    }
    
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setBusiness(response.data.business)
          })
          .catch((error) => {
              console.log({error});
              // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error("Sorry you are being redirected !", {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error('Sorry you are being redirected', { theme: 'dark' });}
              
              navigate('/')
              })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    if (business!=='') {
            
        return (
            <div className='container-fluid'>
                <div className="row p-0">
                    <div className="d-flex flex-column align-items-center justify-content-between" 
                    style={{  
                        backgroundImage: `url('${business.bgUrl}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '150px'
                    }}>
                        <div className='d-flex col-12 justify-content-start'>
                            
                            
                        </div>
                        <div className='d-flex justify-content-center align-items-end'>
                            <div className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center' style={{  
                            height: '90px',
                            width: '90px'
                            }}>
                                <img src={business.logoUrl} alt='altLogo' width={65}  /> 
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="row p-0">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1>{business.name}</h1>
                        <BusinessMenu business={business} handleCategory={handleCategory} category={category} arrCategories={arrCategories}/>
                    </div>
                </div>
                <div className="row p-0 justify-content-center">

                {window.innerWidth < 450 ? 
                    <div className="col-12 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.filter(prod =>prod.categories.includes(activeCategory)).map(product =>{
                            return <ProductCard key={uuidv4()} product={product} businessNameEncoded={businessNameEncoded}/>
                        })}
                    </div>
                     : 
                    <div className=" col-md-10 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.map(product =>{
                            return <ProductCardDesktop key={uuidv4()} product={product} businessNameEncoded={businessNameEncoded}/>
                        })}
                    </div>}
                    {cart && user && cart.length > 0 && 
                        <Link to={`/cart/${user._id}`} className="sticky-bottom bg-success py-3 text-light fw-bold d-flex justify-content-between">
                            <span className='px-2 position-relative'>
                                <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
                                {cart.length}
                                </span>
                                🛒</span>
                            <span>Go to Cart ({summary} €)</span>
                            <span className='px-2'>  </span>
                        </Link>
                         }
                    
                </div>

            </div>

        )
    }else {
        return (
            <div><Loading/></div>
        )
    }
}

export default Business