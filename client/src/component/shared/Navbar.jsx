/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 
import { toast } from 'react-toastify';
import { API } from '../../App';

const Navbar = () => {
    const {user,setuser}=useContext(UserContext)
    const location = useLocation();
    const navigate=useNavigate();
    
    const handlelogout=async()=>{
        try {
            await API.get("/auth/logout",{withCredentials:true})
            toast.success("Logout Succesfull")
            setuser(null)
            navigate("/login")
        } catch (error) {
            toast.error("Error in logout Api")
            console.log(error)
        }
    }
  return (
    <>
    <nav className='flex justify-between px-4 py-4 bg-black text-white sticky top-0 ' style={{zIndex:"1"}}>
        <div className="flex items-center justify-center space-x-2  ">
            <BiDonateBlood color='red' className='text-4xl'/> 
            <h1 className='font-bold text-3xl '>Blood Bank</h1>
        </div>
        <div className="pr-5 text-lg">
            <ul className='flex space-x-8 items-center'>
                <li className=''> 
                    <p className='flex justify-center items-center space-x-2 '>
                        <BiUserCircle/>  
                        <span>Welcome</span>
                        <span>{
                        user?.name||user?.hospitalName||user?.organisationName}
                        &nbsp;</span> 
                        <span className='bg-red-600 p-1 rounded uppercase text-sm font-semibold' style={{backgroundColor:"#0B60B0"}}>{user?.role}</span>
                     </p>
                </li>
                {location.pathname==="/"||location.pathname==="/donar"||location.pathname==="/hospital"?(
                    <li>
                        <Link to="/analytics">
                          Analytics
                        </Link>
                    </li>
                )
                :(
                    <li>
                    <Link to="/">
                      Home
                    </Link>
                </li> 
                )

                }
                <li>
                    <button className='text-black-400 font-bold bg-red-600 px-2 py-1 rounded flex items-center uppercase tracking-wider' onClick={handlelogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar