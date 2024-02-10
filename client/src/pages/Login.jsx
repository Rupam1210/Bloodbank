/* eslint-disable no-unused-vars */
 
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App';
import { UserContext } from '../context/UserContext';
import Spinner from '../component/shared/Spinner';

const Login = () => {
    const [role, setRole] = useState("donar");
    const [email,setemail]=useState("")
    const [loading,setloading]=useState(false)
    const [password,setpassword]=useState("")
    const {setuser}=useContext(UserContext)
    const navigate=useNavigate();
     const handlelogin= async(e,email,password,role)=>{
        e.preventDefault();
        setloading(true)
        try {
            if(!role || !email ||!password){
                setloading(false)
                return toast.error("please provide all the field")
            }
             const {data}=await API.post("/auth/login",{email,role,password},{withCredentials:true})
            if(data?.success){
                console.log(data)
                toast.success(data.message)
                setuser(data.user)
                setloading(false)
                navigate("/")
            
            }else{
                console.log(data)
                toast.error(data.message)
                setloading(false)

            }
            
        } catch (error) {
            console.log(error)
            setloading(false)
        }
     }
   

  return (
    <>
    
        {loading ?<Spinner/>:(
            <>
            <div className="flex   ">
        <div className="w-full h-full">
            <img src="./images/banner1.jpg" alt=""  className='object-cover h-full '/>
        </div>
        <div className="p-10 flex justify-center items-center">
            <form action="submit" className='flex flex-col space-y-4' onSubmit={(e)=>handlelogin(e,email,password,role)}>
                <h1 className='text-center  text-4xl font-bold text-blue-600'  >Login</h1>
                <hr/>
                <div className="flex justify-center space-x-5 text-xl font-semibold" >
                    <div className={role==='donar'?"text-white bg-blue-600 p-1 rounded  ":"p-1" } style={{cursor:"pointer"}} onClick={()=>{setRole("donar")}}>Donar</div>
                    <div className={role==='admin'?"text-white bg-blue-600 p-1 rounded  ":"p-1"}onClick={()=>{setRole("admin")}} style={{cursor:"pointer"}}>Admin</div>
                    <div className={role==='hospital'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("hospital")}} style={{cursor:"pointer"}}>Hospital</div>
                    <div className={role==='organisation'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("organisation")}} style={{cursor:"pointer"}}>Organisation</div>
                </div>
                <hr/>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="foremail">Email</label>
                    <input type="email" name={"email"}  value={email}  onChange={(e)=>setemail(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
                </div>
                 <div className="flex flex-col space-y-3">
                    <label htmlFor="forpassword">Password</label>
                    <input type="password" name={"password"}  value={password}  onChange={(e)=>setpassword(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
                </div>
                <div className="flex  justify-between">
                    <p>Not registered yet ?
                        <Link to={"/register"} className='underline text-blue-600 px-4'>Here!</Link>
                    </p>
                    <button type='submit' className='bg-blue-600 text-white p-1 px-2 rounded-sm'>Login</button>
                </div>

            </form>
        </div>
        </div>
        </>
        )}
   
    </>
  )
}

export default Login