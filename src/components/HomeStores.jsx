import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import languages from '../data/language.json';

const HomeStores = () => {
	const { language: lang } = useContext(AuthContext);
	return (
		<div className="" >
			<h1 className='text-danger m-3'>{languages[0][lang].home.visit}</h1>
            <div className="d-flex justify-content-around">
                <div>Hola</div>
                <div>Chao</div>
            </div>

		</div>
	);
};

export default HomeStores;
