import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css'

const Navbar = () => {
    const {user}:any=useAuth();
  return (
    <div className='navbar-container'>
        <div>ABC Library</div>
        <div>{user.name}</div>
        </div>
  )
}

export default Navbar