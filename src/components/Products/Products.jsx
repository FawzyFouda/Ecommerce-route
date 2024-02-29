import axios from 'axios'
import './products.css'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../CartContext/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import { WishListContext } from '../WishListContext/WishListContext'

function Products() {
  let {addToCart,setCartBadgeNum} = useContext(cartContext)
  let {addToWishList} = useContext(WishListContext)

  async function addProduct(productId) {
    let response = await addToCart(productId)
    if(response.data.status == 'success'){
      toast.success(response.data.message);
      setCartBadgeNum(response.data.numOfCartItems)
    }
  }
  async function addProductWishList(productId) {
    let response = await addToWishList(productId)
    if(response.data.status == 'success'){
      toast.success(response.data.message);
    }
    console.log(response)
  }

  function getFeaturedProduct(){
 return   axios.get('https://ecommerce.routemisr.com/api/v1/products')
      
  }
  let {isLoading,isError,data,isFetching} = useQuery('featuredProducts', getFeaturedProduct)
 
  return (
    <>
    {
      isLoading? <div className='w-100 py-5 d-flex justify-content-center'>
                                      
        <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>:<div className='container py-2'>
      <h2>Featured Products</h2>
      <div className='row products'>
        { 
        
        data?.data.data.map((product) => <div key={product.id} className='col-md-3 product my-4'>
          <Link to={`/productdetails/${product.id}`}>
          <div className='product cursor-pointer py-3 px-2'>
            <img className='w-100' src={product.imageCover} alt={product.title}/>
            <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
            <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
            <div className='d-flex justify-content-between mt-3'>
              <span>{product.price} EGP</span>
              <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
            </div>  
          </div>
          </Link>
          <div className='btns d-flex'>
          <button onClick={() => addProduct(product.id)} className='addBtn'>
            add to cart
            </button>
            <button onClick={() => addProductWishList(product.id)} className='btn'><i class="fa-regular fa-heart"></i></button>
          </div>
        </div>
        )
        }
        {
          console.log(data)
        }
      </div>
      <ToastContainer />

    </div>
    }
      
    </>
  )
}

export default Products