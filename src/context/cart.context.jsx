import { createContext, useState, useEffect } from "react";
import axios from "axios";


const CartContext = createContext();

const CartProviderWrapper = (props) => {    
    const [cart, setCart] = useState(null)

    const getCartData = () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            axios.get(
                `${process.env.REACT_APP_SERVER_URL}/auth/verify`, 
                { headers: { Authorization: `Bearer ${storedToken}`} }
              )
              .then((response) => {
                const user = response.data;
                return axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, 
                    { headers: { Authorization: `Bearer ${storedToken}`} }
                  )
                  .then((response) => {
                      
                    const newCart = response.data.cart;
                    if (newCart) {
                      setCart(newCart)
                    }      
                  })
                  .catch((error) => {
                    console.log({error});       
                  })
                      
              }).catch((error) => {
                console.log({error});       
              })
          }   
    }

    useEffect(()=>{
        getCartData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <CartContext.Provider value={{ cart, getCartData }}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartProviderWrapper, CartContext };