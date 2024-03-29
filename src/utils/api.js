import axios from 'axios';

const storedToken = localStorage.getItem('authToken');


const catchFunctionDefault = (error)=>{
	console.log(error)
}
const thenFunctionDefault = ()=>{
	return ('')
}


// import { getAPI, postAPI } from '../utils/api';
// import { toastifySuccess, toastifyError } from '../utils/tostify';

export const getAPI = async (url, thenFunction = thenFunctionDefault, catchFunction = catchFunctionDefault) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/${url}`,
			{
				headers: { Authorization: `Bearer ${storedToken}` },
			}
		);
		thenFunction(response);
	} catch (error) {
        console.log(error);
		catchFunction(error);
	}
};

export const postAPI = async (url, requestBody, thenFunction = thenFunctionDefault, catchFunction = catchFunctionDefault) => {
	
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/${url}`,
            requestBody,
			{
				headers: { Authorization: `Bearer ${storedToken}` },
			}
		);
		thenFunction(response);
	} catch (error) {
		catchFunction(error);
	}
};

    // import { getAPI, postAPI } from '../utils/api';
    // import { toastifySuccess, toastifyError } from '../utils/tostify';

    ///////////////////////// GET ///////

    // const url = `business/${businessNameEncoded}`;
	// 	const thenFunction = (response) => {
    //         setBusiness(response.data.business)
	// 	};
	// 	const errorFunction = () => {
	// 		toastifyError(`${languages[0][lang].tostify.redirect}`);
	// 		navigate('/');
	// 	};
	// 	getAPI(url, thenFunction, errorFunction);

    ///////////////////////// POST ///////

    //          const url = `products`
    // 			const thenFunction = (response) =>{
    // 				setProduct({ ...initialState, business: business._id });
    // 				toastifySuccess(`${languages[0][lang].tostify.newProduct}`)
    // 			}
    // 			const errorFunction = (error) => {
    // 				toastifyError(`${languages[0][lang].tostify.productError}`)
    // 				setErrorMessage(error.response.data.message)
    // 			}
    // 			postAPI(url,requestBody,thenFunction,errorFunction)

export const putAPI = async (url, requestBody, thenFunction = thenFunctionDefault, catchFunction = catchFunctionDefault) => {
	const token = localStorage.getItem('authToken')
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/${url}`,
            requestBody,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		thenFunction(response);
	} catch (error) {
		catchFunction(error);
	}
};

export const deleteAPI = async (url, thenFunction = thenFunctionDefault, catchFunction = catchFunctionDefault) => {
	try {
		const response = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/${url}`,
			{
				headers: { Authorization: `Bearer ${storedToken}` },
			}
		);
		thenFunction(response);
	} catch (error) {
		catchFunction(error);
	}
};


// export const getAPI = (url, thenFunction, catchFuntion) => {
//     axios.get(`${process.env.REACT_APP_SERVER_URL}/${url}`,{headers: {Authorization: `Bearer ${storedToken}`}})
//     .then(response =>thenFunction(response))
//     .catch(error=>catchFuntion(error))
// }

// export const putAPI = (url, requestBody,thenFunction, catchFuntion) => {
//     axios.put(`${process.env.REACT_APP_SERVER_URL}/${url}`,requestBody,{headers: {Authorization: `Bearer ${storedToken}`}})
//     .then(response =>thenFunction(response))
//     .catch(error=>catchFuntion(error))
// }

// export const deleteAPI = (url, thenFunction, catchFuntion) => {
//     axios.get(`${process.env.REACT_APP_SERVER_URL}/${url}`,{headers: {Authorization: `Bearer ${storedToken}`}})
//     .then(response =>thenFunction(response))
//     .catch(error=>catchFuntion(error))
// }
