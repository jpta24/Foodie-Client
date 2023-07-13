import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import languages from '../data/language.json';
import stores from '../data/homeStores.json';

const HomeStores = () => {
	const { language: lang } = useContext(AuthContext);
	return (
		<div className='mb-3'>
			<h1 className='text-danger m-3'>{languages[0][lang].home.visit}</h1>
			<h5>{languages[0][lang].home.visitTxt}</h5>
			<div className='d-flex justify-content-around'>
				{stores.map((store) => {
					return (
						<div key={store._id} className='col-5 mx-auto pb-3'>
							<h3>{store.title}</h3>
							<p>{store.txt[lang]}</p>
							<Link to={`/${store.title}`} className='col-12 my-1'>
								<img className='home-img' width={'80%'} src={store.img} alt="" />
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HomeStores;
