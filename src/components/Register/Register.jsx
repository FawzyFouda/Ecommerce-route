import axios from 'axios'
import Style from   './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Register() {
  let [resErr,setResErr] = useState('')
  let [loding,setLoding] = useState(false)
  let navigate = useNavigate()
   async function signUp(val){
    setLoding(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err) => {
        setResErr(err.response.data.message)
        setLoding(false)
      })
      if(data.message == "success"){
        navigate('/login')
        setLoding(false)
      }
    }
  let validationSchema = Yup.object({
    name:Yup.string().min(3, 'name min length is 3').max(10, 'name max length is 10').required('input is required'),
    email:Yup.string().email( 'email is inValid').required('input is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/i,'password should start with capital letter').required('input is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password'),'not equal to password']).required('input is required'),
    phone:Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g, 'phone not valid').required('input is required'),
  })
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema,
    onSubmit:signUp
  })
  return (
    <>
        <div className='w-75 mx-auto py-5'>
          <h3>Register Now</h3>
          <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input className='form-control mb-2' type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' />
          {formik.errors.name && formik.touched.name?<div className='alert alert-danger p-2 mt-2'>{formik.errors.name}</div>:""}
          <label htmlFor="email">Email:</label>
          <input className='form-control mb-2' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' />
          {formik.errors.email && formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:""}
          <label htmlFor="phone">Phone:</label>
          <input className='form-control mb-2' type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' />
          {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</div>:""}
          <label htmlFor="password">Password:</label>
          <input className='form-control mb-2' type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
          {formik.errors.password && formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:""}
          <label htmlFor="rePassword">rePassword:</label>
          <input className='form-control mb-2' type="password" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword}</div>:""}
          {resErr?<div className='text-danger p-2 mt-2'>{resErr}</div>:''}
          <button className='btn bg-main text-white mt-2' disabled={!(formik.isValid && formik.dirty)} type='submit'>Register
          {
            loding? <span className='ms-2'>
            <i className='fa-solid fa-spinner fa-spin text-light'></i>
          </span>:null
          }
          </button>
          </form> 
        </div>
    </>
  )
}

export default Register