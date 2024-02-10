/* eslint-disable react-hooks/exhaustive-deps */
import { createContext,  useEffect,  useState } from "react";
import { API } from "../App";

export const UserContext=createContext({});

export const UserContextProvider=({children})=>{
    const[user,setuser]=useState(null)
    
    useEffect(()=>{
        getuser();
    },[]);
    const getuser=async()=>{
        try {
            const {data}=await API.get("/auth/getuser",{withCredentials:true})
            setuser(data.user)
        } catch (error) {
            setuser(null) 
            console.log(error)
        }
    }
  
  
    return (
        <UserContext.Provider value={{user,setuser}}>
            {children}
        </UserContext.Provider>
    )
}