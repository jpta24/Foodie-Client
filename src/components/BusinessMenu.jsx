
import { v4 as uuidv4 } from 'uuid';

const BusinessMenu = ({business,handleCategory, category, arrCategories}) => {
  
  const active ='bg-secondary text-bg-secondary'
  const inactive = 'bg-light text-bg-info'

  return (
    <div className=' col-6 d-flex flex-row justify-content-around'>
      {arrCategories.map(cat => {
        return <span key={uuidv4()} name={cat} className={`badge border border-dark my-1 mx-2 ${category[cat] === true ? active : inactive}`} onClick={()=>handleCategory(cat)}>{cat}</span>
        })}
    </div>
  )
}

export default BusinessMenu