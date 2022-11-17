import { v4 as uuidv4 } from 'uuid';

const OrderStatus = ({statues, status, setStatus}) => {
    
  const active ='bg-secondary text-bg-secondary'
  const inactive = 'bg-light text-bg-info'

  return (
    <div className='col-8 d-flex justify-content-around'>
      {statues.map(cat => {
        return <span style={{cursor:"pointer"}} key={uuidv4()} name={cat} className={`badge col-md-2 border border-dark my-1 mx-1 ${status === cat ? active : inactive}`} onClick={()=>setStatus(cat)}>{cat}</span>
        })}
    </div>
  )
}

export default OrderStatus