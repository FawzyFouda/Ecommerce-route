import axios from 'axios'
import  Style  from'./Allorders.module.css'
import { useEffect, useState } from 'react'

function Allorders() {
  let [allOrders,setAllOrders] = useState(null)

    async function getAllOrders(){
      await axios.get('https://ecommerce.routemisr.com/api/v1/orders/').then((res) => {
      console.log(res.data)
     })
  }
  


  useEffect(() =>{ 
     getAllOrders()

  },[])

  return (
    <>
        <section className='wishlist'>
    <div className="container">
    <h1>My wish List</h1>
    
        <div className='cart d-flex flex-column align-items-center'>
            {
              allOrders.data?.map((ele,idx) => {
                return <>
              <div className='w-100 d-flex border-bottom mb-3 pb-3 align-items-center' key={idx}>
                <div className='product-img col-md-2'><img src={ele.imageCover} alt={ele.title} className=' w-75'/></div>
                <div className='col-md-2 justify-content-center d-flex flex-column'>
                  <h3 className='fs-6 fw-bold'>{ele.title}</h3>
                  <p className='fw-bold'>{ele.price} EGP</p>
                  
                </div>
                <div className='col-md-2 ms-auto'>
                <button className='addBtn btn bg-main text-light' >
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

export default Allorders