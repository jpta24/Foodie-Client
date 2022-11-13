import React from 'react'
import { Button } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid';

const OrderCard = ({order,handleCancelOrder}) => {

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
                <div className='p-1'>
                    {order.products.map(eachProduct=>{
                        return<p key={uuidv4()} className='m-0 text-start d-flex justify-content-between'>
                        <span>{`- (${eachProduct.quantity}) ${eachProduct.product.name}`}</span><span>{order.business.currency} {eachProduct.product.price}</span></p>
                    })}
                </div>
                <hr/>
                <p className='m-0 text-start d-flex flex-wrap justify-content-between'>
                    <span>Name: {order.note.name}</span>
                    <span>Phone: {order.note.phone}</span>
                </p>
                {order.note.street && <p className='m-0 text-start'>Address: {order.note.street}</p>}
                {order.note.note && <p className='text-bold m-0 text-start'>Note: {order.note.note}</p>}
                <hr/>
                <p className='text-bold m-0 text-start'>Summary: {order.business.currency} {order.summary.toFixed(2)}</p>
                <p className='text-bold m-0 text-start'>Status: {order.status} {order.status === 'pending' && <Button variant='outline-success' size='sm' className='py-0 mx-5' onClick={()=>handleCancelOrder(order)}>Cancel</Button>}</p>
                
                
                
            </dir>
        </div>
    </div>
  )
}

export default OrderCard