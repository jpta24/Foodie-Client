import { Card, Button } from 'react-bootstrap';

const BusinessViewCard = ({src,href,button}) => {
  return (
    <>
        <Card className='col-4 mx-0 my-2 p-2 mx-md-5 col-md-2 shadow'>
            <Card.Img className='p-2' variant='top' src={src} />
            <Button variant='outline-success' size='sm' href={href}>
                {button}
            </Button>
        </Card>
    </>
  )
}

export default BusinessViewCard