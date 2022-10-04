import { useState, useContext,useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Row, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BusinessView = () => {
    const { user } = useContext(AuthContext);
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
        if(business.owner !== user._id){
            navigate('/')
        }
    }
    


  return (
    <div className='container-fluid'>
        <div className="row p-0">
        <div className="d-flex align-items-end justify-content-center" 
            style={{  
                backgroundImage: `url('${business.bgUrl}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '150px'
                }}>
                <div className='rounded-circle border border-dark bg-dark opacity-75 d-flex justify-content-center align-items-center' style={{  
                    height: '90px',
                    width: '90px'
                }}>
                   <img src={business.logoUrl} alt='altLogo' width={65}  /> 
                </div>
                
        </div>
            
        </div>
    </div>
  )
}

export default BusinessView