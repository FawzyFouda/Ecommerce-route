import Style from  './Navbar.module.css'
import Logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { cartContext } from '../CartContext/CartContext'

function Navbar() {
  
  

  let {userToken,setUserToken} = useContext(UserContext)
  let {getLogedCart,cartBadgeNum,setCartBadgeNum} = useContext(cartContext)
  let navigate = useNavigate()


  useEffect(() => {
    (async() =>{
      let data = await getLogedCart()
    if(data == 'error'){
      setCartBadgeNum(0)
    }else{
      setCartBadgeNum(data.data.numOfCartItems)
    }
    })()
    
  },[])
  
  function Logout(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  
  return (
    <>
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
          <NavLink className='navbar-brand' to='/'>
            <img src={Logo} alt="freshcart-logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {userToken !==null ? <>
              <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/category">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">Wish List</NavLink>
            </li>
            </>:''}
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className="nav-item d-flex align-items-center">
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart"><i className='fa-solid fa-shopping-cart text-main'>

              </i>
                <span className='badge bg-main text-light'>
                {
                  cartBadgeNum
                }
                </span>
                </NavLink>
            </li>
            {
              userToken!==null ?  <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={Logout}>Logout</span>
            </li> :
            <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </>
            }
            
            
          </ul>
        </div>
        </div>
</nav>
        </>
    </>
  )
}

export default Navbar