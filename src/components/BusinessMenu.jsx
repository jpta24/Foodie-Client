
import { v4 as uuidv4 } from 'uuid';

const BusinessMenu = ({business}) => {
  
  let initialMenu = {}

    let arrCategories = []
        if (business.products) {
            business.products.forEach(prod=>{
                prod.categories.forEach(cate=>{
                    if(!arrCategories.includes(cate)){
                    arrCategories.push(cate) 
                    initialMenu[cate]=false
                    } 
                })
                initialMenu.General=true
            })
        }

  return (
    <div className=' col-6 d-flex flex-row justify-content-around'>
      {arrCategories.map(cat => {
        return <span key={uuidv4()} name={cat} className="badge bg-secondary my-1 mx-2">{cat}</span>
        })}
    </div>
  )
}

export default BusinessMenu