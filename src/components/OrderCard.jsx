import React from 'react'

import { v4 as uuidv4 } from 'uuid';

const OrderCard = ({order}) => {

  return (
    <div className='rounded d-flex flex-row card col-11 align-items-center justify-content-around m-1 shadow'>
        <div className="col-2 m-2 ">
            <div className="p-2 rounded border border-dark d-flex justify-items-center m-auto" 
                style={{  
                    height: '60px',
                    width: '60px',
                    backgroundImage: `url('${order.business.logoUrl}')`,    
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
            </div>
        </div>
        <div className="p-1 col-8 d-flex flex-column justify-content-between">
            <dir className='p-0 m-1'>
                <p className='p-1 m-0 text-start' style={{fontSize:'0.95em', fontWeight:'bolder'}}>Business: {order.business.name}</p>
                <ul className='list-group list-group-horizontal-xxl'>
                    {order.products.map(eachProduct=>{
                        return<li key={uuidv4()} className='list-group-item'>{eachProduct.product.name}</li>
                    })}
                </ul>

                <p className='text-bold m-0 text-start'>Summary: € {order.summary.toFixed(2)}</p>
                <p className='text-bold m-0 text-start'>Status: {order.status}</p>
                
            </dir>
        </div>
    </div>
  )
}

export default OrderCard