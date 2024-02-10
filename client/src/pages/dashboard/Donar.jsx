import React, { useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
import { API } from '../../App';
import moment from 'moment'
import Spinner from '../../component/shared/Spinner';

const Donar = () => {
    const [Data,setData]=useState([]);
    const [loading,setloading]=useState(false);

    const getdonars=async()=>{
        setloading(true)
        try {
            const {data}=await API.get("/inventory/get-donars",{withCredentials:true})
            if(data?.success){
                setData(data?.donars)
                setloading(false)
            }
            // console.log(data.donars)
        } catch (error) {
            console.log(error)
            setloading(false);
        }
    }
    useEffect(()=>{
        getdonars()
    },[])
    // console.log(Data)
  return (
    <>
    <Layout>
     <table className=' w-full  text-center   border border-blue-400' >
        <thead className='text-sm uppercase text-white'style={{backgroundColor:"#0B60B0"}}>
            <tr>
                <th scope='col ' className='px-6 py-4'>Name</th>
                <th scope='col' >Email</th>
                <th scope='col'  >Phone</th>
                <th scope='col'  >Date</th>
            </tr>
        </thead>
        
        <tbody>
        
            
            {Data?.map((records)=>(
                <tr  key={records._id} >
                <td  className='px-6 py-4' >{records.name}</td>
                <td  >{records.email}</td>
                <td  >{records.phone}</td>
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

export default Donar