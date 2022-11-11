
import { v4 as uuidv4 } from 'uuid';

const BusinessMenu = ({handleCategory, category, arrCategories}) => {
  
  const active ='bg-secondary text-bg-secondary'
  const inactive = 'bg-light text-bg-info'

  return (
    <div className='col-12 col-md-6 border d-flex flex-row categories'>
      {arrCategories.map(cat => {
        return <span style={{cursor:"pointer"}} key={uuidv4()} name={cat} className={`badge border border-dark my-1 mx-2 ${category === cat ? active : inactive}`} onClick={()=>handleCategory(cat)}>{cat}</span>
        })}
    </div>
  )
}

export default BusinessMenu