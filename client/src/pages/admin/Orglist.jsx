import React, { useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
import { API } from '../../App'
import moment from 'moment'
import Spinner from '../../component/shared/Spinner'
import { toast } from 'react-toastify'

const Orglist = () => {
    const[loading,setloading]=useState(false)
    const[Data,setdata]=useState()
    const getdonars=async()=>{
        setloading(true)
        try {
            const {data}=await API.get("/admin/org-list",{withCredentials:true})
            console.log(data)
            if(data?.success){
                setdata(data?.orgdata)
                setloading(false)
            }
            // console.log(data.donars)
        } catch (error) {
            console.log(error)
            setloading(false);
        }
    }
    const deleteone=async(id)=>{
       
        try {
            const {data}=await API.delete(`/admin/getdelete/${id}`,{withCredentials:true})
           
            if(data?.success){
                 toast.success(data?.message)
               
                window.location.reload();
            }else{
                toast.error(data?.message)
            }
            // console.log(data.donars)
        } catch (error) {
            console.log(error)
             
        }
    }
    useEffect(()=>{
        getdonars()
    },[])
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
                <th scope='col'  >Action</th>
            </tr>
        </thead>
        
        <tbody>
        
            
            {Data?.map((records)=>(
                <tr  key={records._id} >
                <td  className='px-6 py-4' >{records.organisationName}</td>
                <td  >{records.email}</td>
                <td  >{records.phone}</td>
                <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
                <td  >
                    <button className='bg-red-600 px-3 py-2 rounded-2xl uppercase text-sm font-semibold text-white' onClick={()=>deleteone(records._id)}>Delete</button>
                </td>

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

export default Orglist