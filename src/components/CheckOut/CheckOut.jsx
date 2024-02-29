import axios from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { cartContext } from '../CartContext/CartContext'

function CheckOut() {
  let {checkOutPayment} = useContext(cartContext)


  async function Payment(val){
    let data = await checkOutPayment(val)
      if(data?.data.status == 'success'){
        window.location = data.data.session.url
      }
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:Payment
  })
  return (
    <>
        <div className="w-75 mx-auto">
          <form className="ng-pristine ng-invalid ng-touched" onSubmit={formik.handleSubmit}>
                <label htmlFor="details">Details</label>
                <input type="text" id="details" className="form-control mb-3 ng-pristine ng-invalid ng-touched" name='details' value={formik.values.details} onChange={formik.handleChange}/>
                <label htmlFor="phone">phone</label>
                <input className='form-control mb-2' type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} id='phone' />                
                <label htmlFor="city">city</label>
                <input type="text" id="city" value={formik.values.city} onChange={formik.handleChange} className="form-control mb-3 ng-untouched ng-pristine ng-invalid" name='city'/>
                <button className="btn btn-outline-info w-100 my-5" type='submit'>Pay now</button>
            </form>
          </div>
    </>
  )
}

export default CheckOut