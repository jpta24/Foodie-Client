import { useState, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

import ProductCard from '../components/ProductCard';
import ProductCardDesktop from '../components/ProductCardDesktop';

import BusinessMenu from '../components/BusinessMenu';

const Business = () => {
    
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setBusiness(response.data.business)
          })
          .catch((error) => {
              console.log({error});
              toast.error('Sorry you are being redirected', { theme: 'dark' });
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
                        <BusinessMenu business={business}/>
                    </div>
                </div>
                <div className="row p-0 justify-content-center">

                {window.innerWidth < 400 ? 
                    <div className="col-12 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.map(product =>{
                            return <ProductCard key={uuidv4()} product={product}/>
                        })}
                    </div> : 
                    <div className=" col-md-10 d-flex flex-wrap justify-content-center align-items-stretch ">
                        {business.products.map(product =>{
                            return <ProductCardDesktop key={uuidv4()} product={product}/>
                        })}
                    </div>}
                    
                </div>

            </div>

        )
    }else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Business