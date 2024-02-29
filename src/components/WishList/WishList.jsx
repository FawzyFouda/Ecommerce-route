import './wishList.css'
import { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../WishListContext/WishListContext'
import { cartContext } from '../CartContext/CartContext'


function WishList() {
  let {getLogedWishList,addToWishList,removeWishListItem} = useContext(WishListContext)
  let {addToCart,setCartBadgeNum} = useContext(cartContext)
  let [wishListDetails, setWishListDetails]= useState(null)

  async function getWishList(){
    let {data} = await getLogedWishList()
    let productWish = data.data
    setWishListDetails(productWish)
  }
  async function addProduct(productId) {
    let response = await addToCart(productId)
    if(response.data.status == 'success'){
      setCartBadgeNum(response.data.numOfCartItems)
    }
  }
  async function removeItem(id){
    let {data} = await removeWishListItem(id)
    let filteritems = wishListDetails.filter((e,idx) => data.data.includes(e._id))
    setWishListDetails(filteritems)
  }


  useEffect(()=>{
    getWishList()
},[])
  return (
    <>
    <section className='wishlist'>
    <div className="container">
    <h1>My wish List</h1>
    
        <div className='cart d-flex flex-column align-items-center'>
            {
              wishListDetails?.map((ele,idx) => {
                return <>
              <div className='w-100 d-flex border-bottom mb-3 pb-3 align-items-center' key={idx}>
                <div className='product-img col-md-2'><img src={ele.imageCover} alt={ele.title} className=' w-75'/></div>
                <div className='col-md-2 justify-content-center d-flex flex-column'>
                  <h3 className='fs-6 fw-bold'>{ele.title}</h3>
                  <p className='fw-bold'>{ele.price} EGP</p>
                  <button className=' text-start border-0 bg-transparent text-danger' onClick={() => removeItem(ele._id)}>Remove</button>
                </div>
                <div className='col-md-2 ms-auto'>
                <button className='addBtn btn bg-main text-light'  onClick={() => addProduct(ele._id)}>
                  add to cart
                </button>
                </div>
              </div>
            </>
              })
            }
        </div>
        </div>
        </section>
    </>
  )
}

export default WishList