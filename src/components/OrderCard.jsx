import React from 'react'
import { Button } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid';

const OrderCard = ({order,handleCancelOrder, handleModal}) => {

  return (
    <div className='rounded d-flex flex-row card col-11 align-items-center justify-content-around m-1 shadow'>
        <div className="col-1 m-1 ">
            <div className="d-none d-md-block p-2 rounded border border-dark d-flex justify-items-center m-auto" 
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
        <div className="p-1 col-10 d-flex flex-column justify-content-between">
            <dir className='p-1 m-1'>
                <p className='p-1 m-0 text-start' style={{fontSize:'0.95em', fontWeight:'bolder'}}>Business: {order.business.name}</p>
                <div className='p-1'>
                    {order.products.map(eachProduct=>{
                        return<p key={uuidv4()} className='m-0 text-start d-flex justify-content-between'>
                        <span className='col-8'>{`- (${eachProduct.quantity}) ${eachProduct.product.name}`}</span><span>{order.business.currency} {eachProduct.product.price.toFixed(2)}</span></p>
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
                <p className='text-bold m-0 text-start'>Status: {order.status} 
                </p>
                <div className='col-12 d-flex flex-row flex-wrap justify-content-around'>
                    {order.status === 'pending' && <Button variant='outline-success' size='sm' className='py-0 m-1 col-md-2' onClick={()=>handleCancelOrder(order)}>Cancel Order</Button>} 
                    
                    <Button variant='outline-secondary' size='sm' className='py-0 m-1 col-md-2' onClick={()=>handleModal('Please contact seller to:',order, 'seller')}>Contact Seller</Button>
                    <Button variant='outline-secondary' size='sm' className='py-0 m-1 col-md-2' onClick={()=>handleModal('Please send an email to: contact@foodie.com',order,'us')}>Contact Us</Button>

                </div>
            </dir>
        </div>
    </div>
  )
}

export default OrderCard