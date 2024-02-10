/* eslint-disable no-unused-vars */
import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const[cookie,setcookie]=useCookies('token')
    
    if(cookie.token){ 
        return <Navigate to={"/"}/>
    } else{
        return children
    }
   
}

export default PublicRoute