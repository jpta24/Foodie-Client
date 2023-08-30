import languages from '../data/language.json';
import { Link } from 'react-router-dom';
import DaschboardCartCard from './DaschboardCartCard';
import { v4 as uuidv4 } from 'uuid';

const DashboardCardProd = ({ cart }) => {
	// console.log(cart.cart[0].product);

	return (
		<div className='col-12 col-md-4 text-start my-3'>
			<Link className='ms-4 my-2 h4 text-light' to={`/cart/${cart.user._id}`}>
				{languages[0][cart.lang].dashboard.btnCart}
			</Link>
			<div className='col-12  d-flex flex-wrap justify-content-around align-items-stretch dashboard-cart mt-2'>
				{cart.cart.map((product) => {
					return (
						<DaschboardCartCard
							key={uuidv4()}
							product={product.product}
							currency={product.product.business.currency}
							quantity={product.quantity}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DashboardCardProd;
