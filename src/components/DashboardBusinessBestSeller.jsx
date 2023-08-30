import languages from '../data/language.json';
import { Link } from 'react-router-dom';
import DaschboardCartCard from './DaschboardCartCard';
import { v4 as uuidv4 } from 'uuid';

const DashboardBusinessBestSeller = ({ orders,currency }) => {
	const getTop4Products = (orders) => {
		const allSelled = [];
		orders.forEach((order) => {
			if (order.status) {
            //if (order.status === 'confirmed') {
				order.products.forEach((product) => {
					if (product.product?._id) {
						let index = null;
						allSelled.forEach((selled, i) => {
							if (selled._id === product.product._id) {
								index = i;
							}
						});
						if (index !== null) {
							allSelled[index].qty++;
						} else {
							allSelled.push({
								_id: product.product._id,
								qty: 1,
								product: product.product,
							});
						}
					}
				});
			}
		});

		return allSelled.sort((a,b)=>b.qty-a.qty).slice(0, 6);
	};

	const selled = getTop4Products(orders.orders);

	return (
		<div className='col-12 col-md-12 text-start my-3'>
			<Link
				className='ms-4 my-2 h4 text-light'
				to={`/${orders.business.name.split(' ').join('-')}/products`}
			>
				{languages[0][orders.lang].dashboard.bestSeller}
			</Link>
			<div className='col-12 d-flex flex-wrap justify-content-around align-items-stretch dashboard-cart mt-2 dashboard-bestseller' >
				{selled.map((product) => {
					return (
						<DaschboardCartCard
							key={uuidv4()}
							product={product.product}
							currency={currency}
							quantity={product.qty}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DashboardBusinessBestSeller;
