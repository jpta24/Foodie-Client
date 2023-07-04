import axios from 'axios';
import { putAPI } from '../utils/api';
import { toastifyError } from '../utils/tostify';

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const uploadImage = (file) => {
	return axios
		.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, file)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

export const handleFileUpload = (e, currentImgUrl, setterFunction, field) => {
	// console.log("The file to be uploaded is: ", e.target.files[0]);
	const uploadData = new FormData();
	// imageUrl => this name has to be the same as in the model since we pass
	uploadData.append('imageUrl', e.target.files[0]);
	uploadData.append('currentImg', currentImgUrl);

	uploadImage(uploadData)
		.then((response) => {
			// console.log(response.fileUrl);
			// response carries "fileUrl" which we can use to update the state
			//Ex: setterFunction({ ...business, [field]: response.fileUrl });
			setterFunction(field, response.fileUrl);
		})
		.catch((err) => console.log(`Error while uploading the file:`, err));
};

export const handleAddQtyToCart = (product,qty=1,user,getCartData) => {
	const requestBody = {
		cart: {
			product: product._id,
			quantity: qty,
		},
	};
	const url = `users/addQtyCart/${user._id}`;
	const thenFunction = (response) => {
		getCartData();
	};
	putAPI(url, requestBody, thenFunction);
};

export const handleAddToCart = (product,qty=1,user,getCartData,cart,navigate) => {
	if (user) {
		if (cart.map((prod) => prod.product._id).includes(product._id)) {
			handleAddQtyToCart(product,qty,user,getCartData,cart);
		} else {
			const requestBody = {
				cart: {
					product: product._id,
					quantity: qty,
				},
			};
			const url = `users/addCart/${user._id}`;
			const thenFunction = (response) => {
				getCartData();
			};
			const errorFunction = (error) => {
				toastifyError(error.response.data.message);
			};
			putAPI(url, requestBody, thenFunction, errorFunction);
		}
	} else {
		navigate(`/login`);
	}
};

export const handleRemoveToCart = (product,user,getCartData) => {
	const requestBody = {
		product: product._id,
	};
	const url = `users/removeCart/${user._id}`;
	const thenFunction = (response) => {
		getCartData();
	};
	putAPI(url, requestBody, thenFunction);
};

export const handleRemoveQtyToCart = (product,qty=1,user,getCartData) => {
	const requestBody = {
		cart: {
			product: product._id,
			quantity: qty,
		},
	};
	const url = `users/removeQtyCart/${user._id}`;
	const thenFunction = (response) => {
		getCartData();
	};
	putAPI(url, requestBody, thenFunction);
};
