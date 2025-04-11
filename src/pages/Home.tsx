import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
    const {pathname}=useLocation();
    console.log(pathname)

  return (
    <div >
       
       <Navbar/>
   <div style={{display:'flex', gap:'10px'}}>
   <Sidebar/>
   <div style={{width:'80%'}}>
   <Outlet />
   </div>
   </div>
    </div>
  )
}

export default Home