import { useContext, useEffect, useState } from 'react'
import { cartContext } from '../CartContext/CartContext'
import { Link } from 'react-router-dom'


function Cart() {
  let {getLogedCart,removeCartItem,updateProductQuntity,clearCart,setCartBadgeNum,Payment,setCartDetails,cartDetails} = useContext(cartContext)
async function removeItem(id){
  let {data} = await removeCartItem(id)
  setCartDetails(data)
  setCartBadgeNum(cartDetails.numOfCartItems)
}
async function getCart(){
  let {data} = await getLogedCart()
    setCartDetails(data)
}

async function updateCount(id, count){
  let {data} = await updateProductQuntity(id, count)
  setCartDetails(data)
}
async function clearProductCart(){
  let {data} = await clearCart()
 if(data.message == 'success'){
  setCartDetails(null)
  setCartBadgeNum(0)
 }
}

useEffect(() => {
  getCart()
},[])

  return (
    <div  className='container'>
      <h1>Cart Shop</h1>
    {
        cartDetails?
      <div>
      <div className='cart d-flex flex-column align-items-center'>
        <div className='border-bottom mb-3 pb-3 d-flex justify-content-between w-100 my-5'>
          <h2>Cart Shop</h2>
          <Link to='/checkout'><button className='btn btn-primary' >check out</button></Link>
        </div>
        <div className='border-bottom mb-3 pb-3 d-flex justify-content-between w-100'>
          <div>total price: {cartDetails.data.totalCartPrice}</div>
          <div>total number of items: {cartDetails.data.__v}</div>
        </div>
        <div>
        {
          cartDetails.data.products.map((ele,idx) => {
            return <>
              <div className='w-100 d-flex border-bottom mb-3 pb-3' key={idx}>
                <div className='product-img col-md-2'><img src={ele.product.imageCover} alt={ele.product.title} className=' w-75'/></div>
                <div className='col-md-2 justify-content-center d-flex flex-column'>
                  <h3 className='fs-6 fw-bold'>{ele.product.title}</h3>
                  <p className='fw-bold'>{ele.price} EGP</p>
                  <button className=' text-start border-0 bg-transparent text-danger' onClick={() => removeItem(ele.product._id)}>Remove</button>
                </div>
                <div className='col-md-2 ms-auto align-items-center d-flex'>
                  <button onClick={() => updateCount(ele.product._id,ele.count + 1)} className='px-3 py-2 mx-3 rounded border border-primary'>+</button>
                  <span>{ele.count}</span>
                  <button onClick={() => updateCount(ele.product._id,ele.count - 1)} className='px-3 py-2 mx-3 rounded border border-primary'>-</button>
                </div>
              </div>
            </>
          })
        }
        </div>
      </div>
      </div>:''
      }
        {
          cartDetails?<div className='text-center' style={{marginTop:'100px'}}><button className='btn btn-primary' onClick={() => clearProductCart()}>Clear Cart</button></div>:<div className='text-center' style={{marginTop:'200px'}}>there is no items in Cart</div> 
        }
    
    </div>
  )
}

export default Cart