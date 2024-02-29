import { useParams } from 'react-router-dom'
import  Style  from'./ProductDetails.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useContext } from 'react'
import {ToastContainer, toast } from 'react-toastify'
import { cartContext } from '../CartContext/CartContext'

function ProductDetails() {
  let {addToCart,setCartBadgeNum} = useContext(cartContext)

  async function addProduct(productId) {
    let response = await addToCart(productId)
    if(response.data.status == 'success'){
      setCartBadgeNum( response.data.numOfCartItems)
      toast.success(response.data.message);
    }

  }
let params =  useParams()
function getProductDetails(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
let {isLoading,isError,data} = useQuery('productDetails',() => getProductDetails(params.id))     // productDetails ---query key


  return (
    <section className='container'>
      {
        data?.data.data?<div className='row py-2 align-items-center'>
          <div className='col-md-4'>
            <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
          </div>
          <div className='col-md-8'>
            <h2 className='h5'>{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <h6 className='text-main'>{data?.data.data.category.name}</h6>
            <h6 className='text-main'>Price:{data?.data.data.price} EGP</h6>
            <div className='d-flex justify-content-between'>
              <span>Rating Quantity:{data?.data.data.ratingsQuantity}</span>
              <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
            </div>
            <button onClick={() => addProduct(data?.data.data._id)} className='btn bg-main text-white w-100 mt-2'>Ad To Cart</button>
          </div>
        </div>:''
      }    
            <ToastContainer />

    </section>
  )
}

export default ProductDetails