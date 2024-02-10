/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App';
import Spinner from '../component/shared/Spinner';

const Register = () => {
  const [role, setRole] = useState("donar");
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [name,setname]=useState("")
  const [organisationName,setorganisationName]=useState("")
  const [hospitalName,sethospitalName]=useState("")
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading,setloading]=useState(false)
  const navigate=useNavigate();
   
  const handleregister= async(e, 
    name,
    role,
    email,
    password,
    phone,
    address,
    website,
    hospitalName,
    organisationName,
     )=>{
     e.preventDefault();
     console.log(name,role,email,password,phone,address,website,hospitalName,organisationName)
    setloading(true);
     try {
         if(!role || !email ||!password)return toast.error("please provide all the field")
          const {data}=await API.post("/auth/register",
             {name,
                role,
                email,
                password,
                phone,
                address,
                website,
                hospitalName,
                organisationName},{withCredentials:true})
         if(data?.success){
             console.log(data)
             toast.success(data.message)
             setloading(false)
             navigate("/login")
         
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
  <div className="flex ">
   
      <div className="w-full h-screen  "  >
          <img src="./images/banner2.jpg" alt=""  className='object-cover h-full '/>
      </div>
      <div className="px-10 py-3 w-1/2">
          <form action="submit" className='flex flex-col space-y-2 flex-1' onSubmit={(e)=>handleregister(e,
              name,
              role,
              email,
              password,
              phone,
              address,
              website,
              hospitalName,
              organisationName,
              )}>
              <h1 className='text-center  text-4xl font-bold text-blue-600'  >Register</h1>
              <hr/>
              <div className="flex justify-center space-x-5 text-xl font-semibold " >
                  <div className={role==='donar'?"text-white bg-blue-600 p-1 rounded  ":"p-1" } style={{cursor:"pointer"}} onClick={()=>{setRole("donar")}}>Donar</div>
 
                  <div className={role==='hospital'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("hospital")}} style={{cursor:"pointer"}}>Hospital</div>
                  <div className={role==='organisation'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("organisation")}} style={{cursor:"pointer"}}>Organisation</div>
              </div>
              <hr/>
             { (role==='donar' || role==='admin') &&
             <div className="flex flex-col space-y-3">
                  <label htmlFor="forname">Name</label>
                  <input type="text" name={"name"}  value={name}  onChange={(e)=>setname(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
              </div>}
              { (role==='organisation') &&
             <div className="flex flex-col space-y-3">
                  <label htmlFor="fororganisation">Organisation Name</label>
                  <input type="text" name={"organisationName"}  value={organisationName}  onChange={(e)=>setorganisationName(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
              </div>}
              { (role==='hospital') &&
             <div className="flex flex-col space-y-3">
                  <label htmlFor="forhospital">Hospital Name</label>
                  <input type="text" name={"hospitalName"}  value={hospitalName}  onChange={(e)=>sethospitalName(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
              </div>}
              
              <div className="flex flex-col space-y-3">
                  <label htmlFor="foremail">Email</label>
                  <input type="email" name={"email"}  value={email}  onChange={(e)=>setemail(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
              </div>
               <div className="flex flex-col space-y-3">
                  <label htmlFor="forpassword">Password</label>
                  <input type="password" name={"password"}  value={password}  onChange={(e)=>setpassword(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
              </div>
              <div className="flex flex-col space-y-3">
                  <label htmlFor="forwebsite">Website</label>
                  <input type="text" name={"website"}  value={website}  onChange={(e)=>setWebsite(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
                
            </div>
              <div className="flex flex-col space-y-3">
                  <label htmlFor="foraddress">Address</label>
                  <input type="text" name={"address"}  value={address}  onChange={(e)=>setAddress(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
              </div>
              <div className="flex flex-col space-y-3">
                  <label htmlFor="forphone">Phone No</label>
                  <input type="text" name={"phone"}  value={phone}  onChange={(e)=>setPhone(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
              </div>
              <div className="flex  justify-between"> 
                  <p>Already registered ?
                      <Link to={"/login"} className='underline text-blue-600 px-4'>login !</Link>
                  </p>
                  <button type='submit' className='bg-blue-600 text-white p-1 px-2 rounded-sm' >Submit</button>
              </div>

          </form>
      </div>
  </div>
  )}
  </>
  )
}

export default Register