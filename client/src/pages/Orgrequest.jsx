import React, {   useEffect, useState } from 'react'
 
import { API } from '../App';
import Layout from '../component/shared/Layout';
import moment from 'moment';
import Spinner from '../component/shared/Spinner';
 
import { toast } from 'react-toastify';
 

const Orgrequest = () => {
     
    const [loading,setloading]=useState(false);
    const[data,setdata]=useState("")
    
    const acceptreq=async(val)=>{
       
        try {
            const {data}=await API.get(`/request/req-accept/${val}`,{withCredentials:true})
            console.log(data)
            if(data?.success){
                toast.success(data?.message) 
                window.location.reload(true)  
            }
            if(!data?.success){
                toast.error(data?.message)
            }
            
            
        } catch (error) {
            console.log(error)
        }
    }
    const rejectreq=async(val)=>{
         
        try {
            const {data}=await API.get(`/request/req-reject/${val}`,{withCredentials:true})

            // console.log(data)
            if(data?.success){
                toast.success("Request is rejected")
                window.location.reload(true)
                
            }
            if(!data?.success){
                toast.error("Request is rejected")
                
            }
            
            
        } catch (error) { 
            console.log(error)
        }
    }
    const getrequest=async()=>{
        setloading(true)
        try {
            const{data}=await API.get("/request/get-orgreq",{withCredentials:true})
            
            if(data?.success){
                setdata(data?.reqs)
                setloading(false)
            }
            
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
   
    useEffect(()=>{
        getrequest()
    },[])
  return (

    <>
    <Layout>
        <h1 className='text-center font-bold text-3xl'style={{color:"#0B60B0"}}>Request of Donars and Hospital</h1>
             
           {data && <table className=' w-full  text-left   border border-blue-400 mt-10 ' >
      <thead className='text-sm uppercase  text-white' style={{backgroundColor:"#0B60B0"}}>
          <tr>
              <th scope='col ' className='px-6 py-4'>Email</th>
              <th scope='col' >Quantity</th>
              <th scope='col'  >BloodGroup</th>
              
              <th scope='col'  >Status</th>
              <th scope='col'  >Date</th>
          </tr>
      </thead>
      
      
      <tbody >
      
          
          {data?.map((records)=>(
              <tr  key={records._id}  >
              <td  className='px-6 py-4' >{

              records?.donar?.email
              }{records?.hospital?.email}</td>
              <td  >{records.quantity}</td>
              <td  >{records.bloodGroup}</td>
             
              <td className={`' text-white `}  >
                {records.requestreject&& <span className=' bg-red-600 px-4 py-2 font-semibold rounded' >REJECT</span>}
                {records.requestaccept&& <span className='bg-green-600 px-4 py-2 font-semibold rounded' >ACCEPT</span>}
                {(!records.requestreject &&!records.requestaccept)&& <div className="flex space-x-2">
                <button className='px-4 py-2 font-semibold cursor-pointer rounded' style={{backgroundColor:"#0B60B0"}} onClick={()=>acceptreq(records._id)}>ACCEPT</button>
                <button className=' px-4 py-2 font-semibold cursor-pointer rounded' style={{backgroundColor:"#0B60B0"}}onClick={()=>rejectreq(records._id)}>REJECT</button>
                </div>
               }
                </td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          
      </tbody>
   </table>}
   {!data && <Spinner/>}

        
          {loading &&(
               
                 <Spinner/>
             
           )} 
    
    </Layout>
    </>
    
  )
}

export default Orgrequest