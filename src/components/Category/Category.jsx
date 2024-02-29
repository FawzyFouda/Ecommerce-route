import axios from 'axios'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'


function Category() {

   function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
   function getsingleCategory(categoryId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
  }


     let {isLoading,isError,data,isFetching} = useQuery('getCategories', getAllCategories)
    console.log()
  return (
    
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
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
      </div>:<div className="container">
      <div className='d-flex flex-wrap g-5'>
          {
            data?.data.data.map((e) => {
              return<div className='col-md-4 text-center' key={e._id}>
                <div className='border mx-4 my-4 cursor-pointer'>
                <div><img src={e.image} alt={e.name} className='w-100' height={300}/></div>
                <div className='h4 text-primary cursor-pointer'>{e.name}</div>
                </div>
              </div>
            })
          }
        </div>
      </div>
       
      }
      
    </>
  )
}

export default Category