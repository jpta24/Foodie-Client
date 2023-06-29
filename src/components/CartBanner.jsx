import { Link } from 'react-router-dom';

import languages from '../data/language.json';

const CartBanner = ({cart,user,summary,currency,lang}) => {
  return (
    
        <Link
            to={`/cart/${user._id}`}
            className='fixed-bottom bg-success py-3 text-light fw-bold d-flex justify-content-between'
        >
            <span className='px-2 position-relative'>
                <span className='position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger border border-dark'>
                    {cart
                        .map((prod) => prod.quantity)
                        .reduce((acc, val) => {
                            return acc + val;
                        }, 0)}
                </span>
                🛒
            </span>
            <span>
                {languages[0][lang].business.gotocart} ({summary} {currency})
            </span>
            <span className='px-2'> </span>
        </Link>)
}

export default CartBanner