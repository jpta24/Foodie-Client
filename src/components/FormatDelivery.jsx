import { Card } from 'react-bootstrap';

const FormatDelivery = ({src,onclick}) => {
    return (
        <>
            <Card className='col-3 m-1 p-0  mx-md-2 col-md-2'>
                <Card.Img className='p-2' variant='top' src={src} onClick={onclick} />
            </Card>
        </>
      )
}

export default FormatDelivery