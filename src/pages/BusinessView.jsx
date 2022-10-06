import { useState, useContext,useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo';

import { toast } from 'react-toastify';
import BusinessViewCard from '../components/BusinessViewCard';

import iconsCloud from '../data/icons.json'

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

        let formatsArr = []
        
        Object.entries(business.format).forEach(format=>{
            if(format[1]){
                formatsArr.push(format[0])
            }
        })

        let typesArr = []
        
        Object.entries(business.type).forEach(type=>{
            if(type[1]){
                typesArr.push(type[0])
            }
        })


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
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 d-flex flex-row my-2 justify-content-center">
                    <div className='col-6 d-flex justify-content-start flex-column align-items-start' >
                        <h1>{business.name}</h1>
        
                        <p>{`${business.address.street}, ${business.address.city}, ${business.address.country }`}</p>
                        <span>Delivery Methods:</span>
                        <div className='d-flex'>
                             {formatsArr.map(format => {
                                return <span key={format} className="badge rounded-pill bg-danger m-1" >{format}</span>
                                    })} 
                        </div>
                        <span>Products Types:</span>
                        <div className='d-flex'>
                             {typesArr.map(type => {
                                return <span key={type} className="badge rounded-pill bg-primary m-1" >{type}</span>
                                    })} 
                        </div>
                    </div>
                    <div className="p-1 col-6 m-auto" style={{
                            width: '190px'
                        }}>
                        <div className="border border-dark shadow-lg">
                            <QRCode value={`https://foodie-de.netlify.app/${business.name}`} size='150' logoImage={business.logoUrl} removeQrCodeBehindLogo='true' qrStyle='dots' ecLevel='H' />
                        </div>
                    </div>     
                    </div>
                    
                </div>
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 d-flex justify-content-start flex-column align-items-start">
                        <span>Categories:</span>
                        <div className='d-flex flex-wrap'>
                        
                             {business.categories.map(cat => {
                                return <span key={cat} className="badge rounded-pill bg-success m-1">{cat}</span>
                                    })}
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 col-12 d-flex justify-content-start align-items-start">
                        <BusinessViewCard href={`/${businessNameEncoded}/products`} button='Products' src={iconsCloud[0].products} />
                        <BusinessViewCard href={`/${businessNameEncoded}/employees`} button='Employees' src={iconsCloud[0].employeeManage} />
                        <BusinessViewCard href={`/${businessNameEncoded}/orders`} button='Orders' src={iconsCloud[0].orders} />
                    </div>
                </div>

            </div>
          )
    } else {
        return (
            <div>Loading...</div>
        )
    }
    
}

export default BusinessView