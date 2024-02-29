import Style from  './Login.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Helmet } from 'react-helmet'
function Login() {
  let {setUserToken} =useContext(UserContext)
  let [resErr,setResErr] = useState('')
  let [loding,setLoding] = useState(false)
  let navigate = useNavigate()
    async function logIn(val){
    setLoding(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err) => {
        setResErr(err.response.data.message)
        setLoding(false)
      })
      if(data.message == "success"){
        setLoding(false)
        localStorage.setItem('userToken',data.token)
        setUserToken(data.token)
        navigate('/')
        console.log(data)
      }
    }
  let validationSchema = Yup.object({
    email:Yup.string().email( 'Email Not Valid').required('input is required'),
    password:Yup.string().required('input is required'),
  })
  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema,
    onSubmit:logIn
  })
  return (
    <>
        <div className='w-75 mx-auto py-5'>
          <h3>log in Now</h3>
          <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input className='form-control mb-2' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' />
          {formik.errors.email && formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:""}
          <label htmlFor="password">Password:</label>
          <input className='form-control mb-2' type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
          {formik.errors.password && formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:""}
          {resErr?<div className='text-danger p-2 mt-2'>{resErr}</div>:''}
          <button className='btn bg-main text-white mt-2' disabled={!(formik.isValid && formik.dirty)} type='submit'>Log in
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

export default Login