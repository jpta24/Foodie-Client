import axios from 'axios';

const businessNameEncoded = 'blala';
const url = `business/${businessNameEncoded}`;

const storedToken = localStorage.getItem('authToken');

export const getAPI = async (url, thenFunction, catchFunction) => {
	try {
		const response = await axios.get(
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

export const postAPI = async (url, requestBody, thenFunction, catchFunction) => {
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

export const putAPI = async (url, requestBody, thenFunction, catchFunction) => {
	try {
		const response = await axios.put(
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

export const deleteAPI = async (url, thenFunction, catchFunction) => {
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
