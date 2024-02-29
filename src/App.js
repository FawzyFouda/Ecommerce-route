import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Layout/Layout'
import Home from '../src/components/Home/Home'
import Products from '../src/components/Products/Products'
import Cart from '../src/components/Cart/Cart'
import Login from '../src/components/Login/Login'
import Register from '../src/components/Register/Register'
import Category from '../src/components/Category/Category'
import CheckOut from '../src/components/CheckOut/CheckOut'
import Brands from '../src/components/Brands/Brands'
import Notfound from '../src/components/Notfound/Notfound'
import { UserContext } from './components/Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Allorders from '../src/components/Allorders/Allorders'
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartContextProvider } from './components/CartContext/CartContext';
import WishList from './components/WishList/WishList';
let router = createBrowserRouter([
  {path:'/', element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    {path:'category', element:<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'wishlist', element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'checkout', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders', element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*', element:<Notfound/>},
  ]}
])
function App() {
  let {setUserToken} = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  ); 
}

export default App;
