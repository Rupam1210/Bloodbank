/* eslint-disable no-unused-vars */
 
// import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

 
 

const Protected = ({children}) => {
   const[cookie,setcookie]=useCookies('token')
    
    if(cookie.token){ 
        return children
    } else{
        return <Navigate to={"/login"}/>
    }
   
    
}

export default Protected