import { toast } from 'react-toastify';

export const toastifySuccess = (text) => {
	window.innerWidth < 450
		? toast.success(text, {
				position: toast.POSITION.BOTTOM_CENTER,
				theme: 'dark',
		  })
		: toast.success(text, {
				theme: 'dark',
		  });
};

export const toastifyError = (text) => {
	window.innerWidth < 450
		? toast.error(text, {
				position: toast.POSITION.BOTTOM_CENTER,
				theme: 'dark',
		  })
		: toast.error(text, {
				theme: 'dark',
		  });
};
