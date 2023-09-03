import { Button } from 'react-bootstrap';
import axios from 'axios';

function Test() {
	const requestBody = {
		nombre:'yo',correo:'jeanpierretorres@gmail.com'
	}

	const postAPI = async () => {
		try {
			await axios.post(
				`https://pink-clumsy-gosling.cyclic.app/mails/webfoddys`,
				requestBody
			);
		} catch (error) {
			console.error(error)
		}
	};
	return (
		<div className='flex-grow-1'>
		<Button
		variant='outline-primary'
		size='lg'
		className='col-11 col-lg-8 my-2 '
		onClick={postAPI}
	>
		Send mail
	</Button>
		</div>				
	);
}

export default Test;
