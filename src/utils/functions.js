import axios from 'axios';

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
