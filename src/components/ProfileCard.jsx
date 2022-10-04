import { Card, Col, Row, Button } from 'react-bootstrap';

const ProfileCard = ({src,onclick,button}) => {
  return (
    <>
        <Card className='col-3 mx-1 my-2 p-1  mx-md-5 col-md-2'>
            <Card.Img className='p-2' variant='top' src={src} />
            <Button variant='outline-success' size='sm' onClick={onclick}>
                {button}
            </Button>
        </Card>
    </>
  )
}

export default ProfileCard