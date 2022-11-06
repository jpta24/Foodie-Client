import { useContext } from 'react';
import OrderCard from '../components/OrderCard';
import { CartContext } from '../context/cart.context';

import { v4 as uuidv4 } from 'uuid';
import Loading from '../components/Loading';

const OrdersPage = () => {
    
    const { user } = useContext(CartContext);


    if (user) {
        console.log(user.orders);
        return <div className='container p-0'>
            <div className="row d-flex flex-row rounded border border-light">
                <div className="col-12 col-md-10">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2 mt-2 form-control">
                        <h1>Hi, {user.username}</h1>
                        <h3>These are your Orders:</h3>
                        <div className="col-12 cartProducts">
                               {user.orders.map(order=>{
                                return<OrderCard key={uuidv4()} order={order} />
                               })}
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    }else{
        return (
            <div><Loading/></div>
        )
    }
}

export default OrdersPage