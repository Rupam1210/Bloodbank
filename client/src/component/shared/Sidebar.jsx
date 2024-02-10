/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const {user}=useContext(UserContext)
    const location=useLocation();
  return (
    <>
    <div className=" flex items-center  sidebar  ">
        <div className=" flex flex-col   text-2xl side">
            {user?.role==="organisation" &&(
                <>
                <div className={`menu-items ${location.pathname==='/' && "active"}`}>
                    <i className="fa-solid fa-warehouse"></i>
                    <Link to="/">Inventory</Link>
                </div>
                <div className={`menu-items ${location.pathname==='/donar' && "active"}`}>
                    <i className="fa-solid fa-hand-holding-medical"></i>
                    <Link to="/donar">Donar</Link>
                </div>
                <div className={`menu-items ${location.pathname==='/hospital' && "active"}`}>
                    <i className="fa-solid fa-hospital"></i>
                    <Link to="/hospital">Hospital</Link>
              </div>
                
                </>
            )}
            {  (user?.role==="hospital"||user?.role==="donar") &&(
                <>
                <div className={`menu-items ${location.pathname==='/organisation' && "active"}`}>
                    <i className="fa-sharp fa-solid fa-building-ngo"></i>
                    <Link to="/organisation">Organisation</Link>
                </div>
                <div className={`menu-items ${location.pathname==='/request' && "active"}`}>
                    <i className="fa-sharp fa-solid fa-building-ngo"></i>
                    <Link to="/request">Request</Link>
                </div>
                </>
            )}
            
              {  (  user?.role==="organisation")&&(
                <>
                <div className={`menu-items ${location.pathname==='/org-request' && "active"}`}>
                    <i className="fa-sharp fa-solid fa-building-ngo"></i>
                    <Link to="/org-request">Request</Link>
                </div>
               
    
                </>
            )}
            {user?.role === "admin" && (
            <>
              <div
                className={`menu-items ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-items ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-items ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organisation </Link>
              </div>
            </>
          )}


        </div>
    </div>
    </>
  )
}

export default Sidebar