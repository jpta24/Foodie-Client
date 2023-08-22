import { useState } from 'react';
import languages from '../data/language.json';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DashboardOrderCard from './DashboardOrderCard';
import DashboardOrderCardStatus from './DashboardOrderCardStatus';
import DashboardStoreCard from './DashboardStoreCard';
import RedirectCard from './RedirectCard';

const DashboardStores = ({ stores }) => {
	const [store, setStore] = useState(stores.stores.saved.length !== 0 ? 'Saved' :'Visited');
	const storesTypes = ['Saved', 'Visited'];
	return (
		<div className='col-12 col-md-2 text-start my-3'>
			<Link className='ms-4 h4 text-light' to={`/redirect/${stores.user._id}`}>
				{languages[0][stores.lang].dashboard.btnSavedBusiness}
			</Link>
            <div className='col-12  d-flex flex-column align-items-center dashboard-cart mt-2'>
				<DashboardOrderCardStatus
					statues={storesTypes}
					setStatus={setStore}
					status={store}
				/>
				<div
					className='col-12'
					style={{ height: '337px', overflow: 'auto' }}
				>
					{stores.stores[store.toLocaleLowerCase()].length === 0 ? <h4 className='mx-auto text-center my-4'>{`You don't have ${store} business`} </h4>
                    :  stores.stores[store.toLocaleLowerCase()]
						.map((business) => {
							return <DashboardStoreCard key={uuidv4()} business={business} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default DashboardStores;
