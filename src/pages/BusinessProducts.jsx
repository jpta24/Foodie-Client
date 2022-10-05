import { useState, useContext,useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo';

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BusinessProducts = () => {
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
                        <div className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center' style={{  
                            height: '90px',
                            width: '90px'
                        }}>
                           <img src={business.logoUrl} alt='altLogo' width={65}  /> 
                        </div>
                    </div>
                </div>
                <div className="row p-0">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1>{business.name}</h1>
                        <Button variant='outline-primary' size='lg' className='col-4 col-md-2 m-2' href={`/${businessNameEncoded}/create-product`}> ➕ Add Product</Button>
                    </div>
                </div>
                <div className="row p-0 justify-content-center">
                    <div className=" col-md-8 col-12 d-flex flex-column justify-content-center align-items-center ">
                        <Button variant='outline-primary' size='lg' className='col-4 col-md-2 m-2 '> ➕ Add Product</Button>
                    </div>
                </div>

            </div>

        )
    }else {
        return (
            <div>Loading...</div>
        )
    }

}

export default BusinessProducts