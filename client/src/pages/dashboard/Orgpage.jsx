import React, {  useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
 
import Spinner from '../../component/shared/Spinner';
import moment from 'moment';
import { API } from '../../App';

 

const Orgpage = () => {
  const [Data,setData]=useState([]);
  const [hosData,sethosData]=useState([]);
  const [loading,setloading]=useState(false);
  
  
  const getorg=async()=>{
    setloading(true)
    try {
          const {data}=await API.get("/inventory/get-org",{withCredentials:true})
          if(data?.success){
              sethosData(data?.orgprofile)
              setloading(false)
          }
    } catch (error) {
        console.log(error)
        setloading(false);
    }
}
  const getdonars=async()=>{
      setloading(true)
      try {
            const {data}=await API.get("/inventory/get-org-hospital",{withCredentials:true})
            if(data?.success){
                setData(data?.orgprofile)
                setloading(false)
            }
      } catch (error) {
          console.log(error)
          setloading(false);
      }
  }
  
  useEffect(()=>{
    getorg()
},[])
  useEffect(()=>{
      getdonars()
  },[])
  // console.log(Data)
return (
  <>
  
  <Layout>
  <div className="">
   
   </div>
     
   <table className=' w-full  text-left   border border-blue-400' >
      <thead className='text-sm uppercase  text-white' style={{backgroundColor:"#0B60B0"}}>
          <tr>
              <th scope='col ' className='px-6 py-4'>Name</th>
              <th scope='col' >Email</th>
              <th scope='col'  >Phone</th>
              <th scope='col'  >Address</th>
              <th scope='col'  >Date</th>
          </tr>
      </thead>
      
      
      <tbody>
      
          
          { Data?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.organisationName}</td>
              <td  >{records.email}</td>
              <td  >{records.phone}</td>
              <td  >{records.address}</td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          { hosData?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.organisationName}</td>
              <td  >{records.email}</td>
              <td  >{records.phone}</td>
              <td  >{records.address}</td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          
      </tbody>
   </table>
  
   
   {loading &&(
               
                 <Spinner/>
             
           )} 
  </Layout>
  </>
 
)
}

export default Orgpage