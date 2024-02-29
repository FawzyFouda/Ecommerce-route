import { Navigate } from 'react-router-dom'
import  Style  from'./ProtectedRoute.module.css'

function ProtectedRoute(props) {
  if(localStorage.getItem('userToken') !== null){
    return props.children
  } else {
    return <Navigate to={'/login'}/>
  }
  return (
    <>
        <div>
            template
        </div>
    </>
  )
}

export default ProtectedRoute