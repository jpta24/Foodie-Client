import { Card, Button } from 'react-bootstrap';
import {  Link  } from 'react-router-dom';

const BusinessViewCard = ({src,href,button}) => {
  return (
    <>
        <Link to={href} className='card col-4 mx-0 my-2 p-2 mx-md-5 col-md-2 shadow'>
            <Card.Img className='p-2' variant='top' src={src} />
            <Button variant='outline-success' size='sm'>
                {button}
            </Button>
        </Link>
    </>
  )
}

export default BusinessViewCard