import axios from "axios"
import { createContext, useEffect, useState } from "react"
export let cartContext = createContext()
export function CartContextProvider(props){
  let [cartBadgeNum, setCartBadgeNum] = useState(null)
  let [cartDetails, setCartDetails]= useState(null)
  let [cartId, setCartId]= useState(null)

let headers = {
  token: localStorage.getItem('userToken')
}
  async function getLogedCart(){    //to get cart details when start app
    return await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
      {headers}).then((res) => res).catch((err) => (err.response.status == 404)?'error':'')
}
  async function getCartId(){    //to get cart details when start app
    return await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
      {headers}).then((res) => setCartId(res.data.data._id)).catch((err) => (err.response.status == 404)?'error':'')
}
useEffect(() => {
  getCartId()
},[])
  function addToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      {productId},{headers}).then((res) => res).catch((error) => error)
  }
  function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((res)=>res)
  }
  function updateProductQuntity(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers}).then((res)=>res)
  }
  function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((res)=>res).catch((err) => console.log(err))
  }

  function checkOutPayment(formData){                                                                   
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
    ,
    {
      shippingAddress:formData
    }
    ,
    {
      headers
    }
    
    ).catch(err => console.log('eee'))

  }
  return<cartContext.Provider value={{cartDetails,setCartDetails,addToCart,checkOutPayment,headers,getLogedCart,removeCartItem,updateProductQuntity,clearCart,setCartBadgeNum,cartBadgeNum}}>
    {props.children}
  </cartContext.Provider>
}
