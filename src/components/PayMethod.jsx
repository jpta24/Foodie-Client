import { Card } from 'react-bootstrap';

const PayMethod = ({src,onclick}) => {
    return (
        <>
            <Card className='col-3 mx-1 my-1 p-1  mx-md-2 col-md-2'>
                <Card.Img className='p-2' variant='top' src={src} onClick={onclick} />
            </Card>
        </>
      )
  
}

export default PayMethod