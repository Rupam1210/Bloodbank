import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
import { UserContext } from '../../context/UserContext'
 
import Spinner from '../../component/shared/Spinner';
import { API } from '../../App';
import { toast } from 'react-toastify';
import moment from 'moment';

const Request = () => {
    const {user}=useContext(UserContext);
    const [loading,setloading]=useState(false);
    
    const [inventoryType, setInventoryType] = useState("in");
    const [bloodGroup, setBloodGroup] = useState("");
    const [quantity, setQuantity] = useState("");
    const [email, setEmail] = useState("");
    const[data,setdata]=useState("")

    const createrequest=async()=>{
        
        if(user?.role==="donar" && inventoryType==="out")return toast.error("Donar cannot select out Inventory Type")
        if(user?.role==="hospital" && inventoryType==="in")return toast.error("Hospital cannot select IN Inventory Type")
        if(!quantity||!email)return toast.error("Please Provide all the details")
        try {
            const {data}=await API.post("/request/create",{bloodGroup,inventoryType,quantity,email},{withCredentials:true})
            console.log(data)
            if(data?.success){
                toast.success("Request sending Succesfull")
                setBloodGroup("")
                setEmail("")
                setInventoryType("")
                setQuantity("")
                window.location.reload(true)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const getrequest=async()=>{
        setloading(true)
        try {
            const{data}=await API.get("/request/get-req",{withCredentials:true})
            
            if(data?.success){
                setdata(data?.reqs)
                setloading(false)
            }
            
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    console.log(data)
    useEffect(()=>{
        getrequest()
    },[])
  return (

    <>
    <Layout>
             <>
            <div className='flex flex-col justify-center items-center'>
            <h4 className='text-2xl ' >   <i className="fa-solid fa-plus mr-2 py-4"></i>Send New Request</h4>
            <div className="bg-blue-200 flex flex-col ">
            <div className="  px-6 py-10 flex flex-wrap space-x-6 ">
                <div className="flex space-x-2  ">
                   
                    
                        <div className="flex  items-center space-x-2">
                            
                            <div> Blood Type </div>

                            <input type='radio' value={"in"} name="default"  onChange={(e)=>setInventoryType(e.target.value)} defaultChecked/>
                            <label htmlFor="in">IN</label>
                        </div>
                        <div className="flex  items-center space-x-2">
                            <input type='radio' value={"out"} name="default" onChange={(e)=>setInventoryType(e.target.value)}/>
                            <label htmlFor="out">OUT</label>
                        </div>
                
                </div>
                <div className="flex flex-col">
                    <label htmlFor="blood">BloodGroup</label>
                <select onChange={(e)=>setBloodGroup(e.target.value)} className='input p-0' >
                    <option defaultValue="Open this select menu"> Open this select menu</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                </select>
                </div>
                <div className="flex flex-col">
                <label htmlFor="OrganisationEmail">Organisation Email</label>
                    <input type="email" value={email}onChange={(e)=>setEmail(e.target.value)} className='input' />
                    
                </div>
                <div className="flex flex-col">
                <label htmlFor="Quantity">Quantity</label>
                    <input type="Number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='input'/>
                
                </div>
               
            </div>
            <div className="flex pb-6 justify-center"> <button className='bg-red-600 text-white px-2 py-1 text-lg outline-none border-none rounded-lg uppercase font-semibold w-1/3 ' onClick={createrequest}>Send</button></div>
           
            </div>
            </div>
            
             
 
            
            </>
           {data && <table className=' w-full  text-left   border border-blue-400 mt-10 ' >
      <thead className='text-sm uppercase  text-white' style={{backgroundColor:"#0B60B0"}}>
          <tr>
              <th scope='col ' className='px-6 py-4'>Email</th>
              <th scope='col' >Quantity</th>
              <th scope='col'  >BloodGroup</th>
              <th scope='col'  >Response</th>
              <th scope='col'  >Status</th>
              <th scope='col'  >Date</th>
          </tr>
      </thead>
      
      
      <tbody>
      
          
          {data?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.email}</td>
              <td  >{records.quantity}</td>
              <td  >{records.bloodGroup}</td>
              <td  >{records.msg}</td>
              <td className='text-white '  >
                {records.requestreject&& <span className='bg-red-600 p-3 font-semibold'>REJECT</span>}
                {records.requestaccept&& <span className='bg-green-600 p-3 font-semibold'>ACCEPT</span>}
                {(!records.requestreject &&!records.requestaccept)&& <span className=' p-3 font-semibold' style={{backgroundColor:"#0B60B0"}}>PENDING</span>}
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

export default Request