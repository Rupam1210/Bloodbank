/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { API } from '../App';
import { toast } from 'react-toastify';

const Modal = ({setmenus}) => {
    const {user}=useContext(UserContext)

    const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const [menu, setmenu] = useState(true);

  
  const handleSubmit=async()=>{
   
   try {
    if(inventoryType==="out")return alert("Donar cannot be take out blood from organisation")
    if(!email||!bloodGroup||!quantity)return alert("Please provide all the field")
    const {data}=await API.post("/inventory/create-in",{
        quantity,email,bloodGroup,inventoryType,donar:user?._id
    },{withCredentials:true})
    if(data?.success){
        toast.success(data?.message)
        setmenu(false)
        setmenus(false)
        

    }
    
   } catch (error) {
    console.log(error)
   }
  }
  const closebtn=()=>{
    setmenu(false)
    setmenus(false)
     
  }
  return (
    <>
      
   {menu && <div className=  "p-8 rounded-xl absolute w-1/2 top-1/4"style={{backgroundColor:"#E0CCBE"}} >
        <div className="flex flex-col space-y-5">
            <h1 className='text-black-600 text-2xl text-center font-semibold'>Manage Blood Record</h1><hr/>
            <div className="flex space-x-2">
                Blood Type  &nbsp;
                 
                    <div className="flex ">
                        <input type='radio' value={"in"} name="default"  onChange={(e)=>setInventoryType(e.target.value)} defaultChecked/>
                        <label htmlFor="in">IN</label>
                    </div>
                    <div className="">
                        <input type='radio' value={"out"} name="default" onChange={(e)=>setInventoryType(e.target.value)}/>
                        <label htmlFor="out">OUT</label>
                    </div>
            
            </div>
            <select onChange={(e)=>setBloodGroup(e.target.value)} className='input' >
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
            <div className="flex flex-col">
            <label htmlFor="OrganisationEmail">Organisation Email</label>
                <input type="email" value={email}onChange={(e)=>setEmail(e.target.value)} className='input' />
                
            </div>
            <div className="flex flex-col">
            <label htmlFor="Quantity">Quantity</label>
                <input type="Number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='input'/>
               
            </div>
            <div className="flex justify-between space-x-14">
                <button className='bg-red-600 text-white px-2 py-2 text-lg outline-none border-none rounded-xl w-1/3' onClick={closebtn}>Close</button>
                <button className='bg-red-600 text-white px-2 py-1 text-lg outline-none border-none rounded-xl w-1/3' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>}
    </>
  )
}

export default Modal