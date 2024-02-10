/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { API } from '../../App';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Spinner from '../../component/shared/Spinner';

const Analytics = () => {
  const[data,setData]=useState([]);
  const[Data,setorgData]=useState([]);
  const [email,setemail]=useState("")
  const[loading,setloading]=useState(false)
  const {user}=useContext(UserContext);
  const colors = [
    "#BF3131",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];
  
  const getdata=async()=>{
    setloading(true)
    try {
      const {data}=await API.get(`/inventory/anlytics?email=${email}`,{withCredentials:true})
      
      if(data?.success){
        toast.success(data?.message)
        setorgData(data?.bloodGroupData)
        setloading(false)
      }
      if(!data?.success){
        toast.error(data?.message)
        setloading(false)
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getorgdata=async()=>{
    setloading(true)
    try {
      const {data}=await API.get(`/inventory/anlytics`,{withCredentials:true})
      
      if(data?.success){
        setData(data?.bloodGroupData)
        setloading(false)
      }
      if(!data?.success){
        toast.error(data?.message)
        setloading(false)
        
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(()=>{
    getorgdata()
  },[]);

  return (
    <>
    <Layout>
      {loading &&<Spinner/>}

      <div className=" flex flex-col justify-center items-center w-full space-y-4" >
        { user?.role!=="organisation"?<>
        <h1 className='text-3xl font-semibold mt-6 mb-6' style={{color:"#0B60B0"}}>Check The Availablity of Blood at Different Organisation</h1>
        <div className="flex rounded-3xl p-3 items-center justify-between space-x-3  w-1/2" style={{backgroundColor:"#0B60B0",}}>
          <input type="email" value={email} placeholder='Eg. Organisation email' className='bg-transparent outline-none flex-1 text-white ' onChange={(e)=>setemail(e.target.value)} />
          <MdOutlineScreenSearchDesktop className='text-3xl cursor-pointer text-white' onClick={getdata}/>
        </div></>:(
          <div className="text-3xl font-semibold"style={{color:"#0B60B0"}}>
            Available Blood Bank
          </div>
        )}
        <div className="grid  md:grid-cols-4  gap-8 sm:grid-cols-2">
          { user?.role==="organisation"?data?.map((items,i)=>(
            <div className="flex flex-col w-max   shadow-xl px-6 py-4 space-y-4 rounded-xl" key={i} style={{backgroundColor:"#EEF5FF"}}>
              <div className="flex flex-col ">
                <h1 className='text-xl font-bold text-center mb-4 text-white py-2 ' style={{backgroundColor:`${colors[i]}`}}>{items.bloodGroup}</h1>
                <div className="flex  justify-between">
                  <span>Total IN :</span>
                  <span><b>{items.totalIn}ml</b></span>
                  </div>
                  <div className="flex  justify-between">
                      <span>Total OUT :</span>
                      <span><b>{items.totalOut}ml</b></span>
                  </div>
                
              </div>
              <div className="text-white  px-3 py-2" style={{backgroundColor:`${colors[i]}`}}>
                Total Available Blood: <b>{items.avilableblood}ml</b>
              </div>
               
              
            </div>
          )):(
            Data?.map((items,i)=>(
              <div className="flex flex-col w-max   shadow-xl px-6 py-4 space-y-4 rounded-xl" key={i} style={{backgroundColor:"#EEF5FF"}}>
                <div className="flex flex-col ">
                  <h1 className='text-xl font-bold text-center mb-4 text-white py-2 ' style={{backgroundColor:`${colors[i]}`}}>{items.bloodGroup}</h1>
                 
                  <div className="flex  justify-between">
                      <span>Total IN :</span>
                      <span><b>{items.totalIn}ml</b></span>
                  </div>
                  <div className="flex  justify-between">
                      <span>Total OUT :</span>
                      <span><b>{items.totalOut}ml</b></span>
                  </div>
                 
                </div>
                <div className="text-white  px-3 py-2" style={{backgroundColor:`${colors[i]}`}}>
                  Total Available Blood: <b>{items.avilableblood}ml</b>
                </div>
                 
                
              </div>
          )))}
          
        </div>
      </div>
   
    </Layout>
    
    </>
    
  )
}

export default Analytics