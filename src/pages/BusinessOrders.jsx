import { useState,useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
// import OrderCard from '../components/OrderCard';
// import { CartContext } from '../context/cart.context';
import axios from 'axios';

import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
import BusinessOrdersCard from '../components/BusinessOrdersCard';
import Loading from '../components/Loading';

const BusinessOrders = () => {
  
    // const { user } = useContext(CartContext);
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
              // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error("Sorry you are being redirected !", {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error('Sorry you are being redirected', { theme: 'dark' });}
              navigate('/')
              })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


    if (business) {
        console.log(business);
        return <div className='container p-0'>
            <div className="row d-flex flex-row rounded border border-light">
                <div className="col-12 col-md-10">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 form-control">
                        <h1>Hi, {business.name}</h1>
                        <h3>These are your Orders:</h3>
                        <div className="col-12 cartProducts">
                               {business.orders.map(order=>{
                                return<BusinessOrdersCard key={uuidv4()} order={order} currency={business.currency} />
                               })}
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    }else{
        return (
            <div>L<Loading/></div>
        )
    }
}

export default BusinessOrders