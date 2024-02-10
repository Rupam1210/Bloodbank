/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {  useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
 
import Spinner from '../component/shared/Spinner'
import Layout from '../component/shared/Layout'
import { useNavigate } from 'react-router-dom'
import { API } from '../App'
import moment from 'moment'
 
 

const Home = () => {
  const {user}=useContext(UserContext)
 const navigate=useNavigate()
  
  const [data,setData]=useState([]);
  const [loading,setloading]=useState(false);
  const getall=async()=>{
   setloading(true)
   try {
      const {data}=await API.get("/inventory/getrecord",{withCredentials:true})
      
      if(data?.success){
         setData(data?.invent)
         setloading(false)
      }
   } catch (error) {
      console.log(error)
      setloading(false)
   }
  }
  useEffect(()=>{
   getall()
  },[])
 
 
  return (
     <>
     {!user &&<Spinner/>}
     <Layout>
      
      {user?.role==="admin" && navigate("/admin")}
      {loading ? <Spinner/>:(
         <>
         { user?.role==="organisation"&&<div  >
            <h4>   <i className="fa-solid fa-plus text-success py-4"></i> Inventory</h4>
   <table className=' w-full  text-center   border border-blue-400' >
        <thead className='text-sm uppercase text-white'style={{backgroundColor:"#0B60B0"}}>
            <tr>
                <th scope='col ' className='px-6 py-4'>BloodGroup</th>
                <th scope='col' >Inventory Type</th>
                <th scope='col'  >Quantity</th>
                <th scope='col'  >Donar Email</th>
                <th scope='col'  >Date & Time</th>
            </tr>
        </thead>
        
        <tbody>
        
            
            {data?.map((records)=>(
                <tr  key={records._id} >
                <td  className='px-6 py-4' >{records.bloodGroup}</td>
                <td  >{records.inventoryType}</td>
                <td  >{records.quantity}</td>
                <td  >{records.email}</td>
                <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
            </tr>
            ))}
            
        </tbody>
     </table>
         </div>}
         </>
      )}
      
       {user?.role==="donar" &&(
         <div className="text-center flex flex-col space-y-4 items-center  ">
            <h1 className='uppercase text-2xl font-semibold underline'>{user?.name}</h1>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at atque, animi numquam maiores eligendi, sint dignissimos explicabo, similique ad recusandae eius magni aperiam. Neque temporibus perferendis cum quas hic expedita labore ea accusamus eos accusantium animi quasi laudantium, beatae ut asperiores. Repudiandae, perspiciatis at?</p>
         </div>
       )}

     </Layout>
     
     
     </>
  )
}

export default Home