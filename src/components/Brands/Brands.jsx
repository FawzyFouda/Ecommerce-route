import Style from  './Brands.module.css'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import axios from 'axios'


function Brands() {
 
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  

     let {isLoading,isError,data,isFetching} = useQuery('getBrands', getAllBrands)
  return (
    
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className='container'>
        <h2 className='text-center mt-5'>All Brands</h2>
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
      </div>:
      <div className='d-flex flex-wrap g-5'>
          {
            data?.data.data.map((e) => {
              return<div className='col-md-4 text-center' key={e._id}>
                <div className='border mx-4 my-4 cursor-pointer'>
                <div><img src={e.image} alt={e.name} className='w-100' height={300}/></div>
                <div className='cursor-pointer mb-3'>{e.name}</div>
                </div>
              </div>
            })
          }
        </div>
      }
      
      </div>
      
    </>
  )
}

export default Brands