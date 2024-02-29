import axios from "axios"
import { createContext, useEffect, useState } from "react"
export let WishListContext = createContext()



let headers = {
  token: localStorage.getItem('userToken')
}
export function WishListContextProvider(props) {

  async function getLogedWishList(){    //to get cart details when start app
    return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers}).then((res)=>res).catch((err) => (err.response.status == 404)?'error':'')
}
  function addToWishList(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
      {productId},{headers}).then((res) => res).catch((error) => error)
  }
  function removeWishListItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers}).then((res)=>res)
  }

  return<WishListContext.Provider value={{headers,getLogedWishList,addToWishList,removeWishListItem}}>
  {props.children}
</WishListContext.Provider>
}

