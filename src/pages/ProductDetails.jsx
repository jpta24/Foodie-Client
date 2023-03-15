import { useState, useEffect, useContext } from 'react';
import {  Link, useParams  } from 'react-router-dom'; 
import { AuthContext } from '../context/auth.context';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IoCloseSharp } from 'react-icons/io5'

import languages from '../data/language.json'
import Loading from '../components/Loading';


const ProductDetails = (props) => {
	const {language:lang} = useContext(AuthContext);

  const { productID } = useParams();
  const [product, setProduct] = useState(null)
  console.log(languages[0][lang].productDetails);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); 
    axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${productID}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
              setProduct(response.data.product)
          })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rating = 4.5
  
if(product){
    return (
        <div class="container">
            <div class="row">
                <div class="col-lg-4 order-lg-2 d-flex flex-column justify-content-end align-items-end">
                    <Link to={`/${product.business.name}`}>
                        <IoCloseSharp className='h1 mt-4 mx-4'/>
                    </Link>
                    <div className="rounded-circle border border-dark mb-3 mx-auto shadow" 
                        style={{  
                        height: '300px',
                        width: '300px',
                        backgroundImage: `url('${product.mainImg}')`,    
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        }}
                    >
                    </div>
                </div>
                <div class="col-lg-5 order-lg-1 text-start px-5 ">
                    <h1 className='mt-lg-5 mb-2'>{product.name}</h1>
                    <h5 className='my-2'>Rating {rating}</h5>
                    <p className='my-3'>{product.description}</p>
                    <h6>
                        {languages[0][lang].productDetails.ingredients}
                    </h6>
                    <div className='p-2 col-12 d-flex flex-row mb-3' >
                        {product.ingredients.map(cat => {
                            return <span key={uuidv4()} name={cat} className="badge rounded-pill bg-danger m-1" >{cat}</span>
                        })}  
                    </div>
                    <h2 className='mb-3'>
                        {product.business.currency} {product.price.toFixed(2)}
                    </h2>
                    <div className='bg-primary col-lg-7 col-9 px-2 py-2 text-center rounded-pill my-3'>
                        {languages[0][lang].productDetails.addToCart}
                    </div>
                </div>
            </div>
        </div>
    );
}else{
    return (
        <div><Loading/></div>
    )
}
  
}

export default ProductDetails