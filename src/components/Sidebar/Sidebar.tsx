import { sideBar } from './sidebarModel';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


const Sidebar = () => {
    
   
    const checkUser:any=useAuth();
    const isUser= checkUser?.user?.role ==='student';
    const filterSidebar=  isUser?sideBar.filter(item=>(item.role===('student')|| item.role===('both'))):sideBar.filter(item=>item.role===('admin')|| item.role===('both'));
    console.log(filterSidebar,checkUser,isUser)
  return (
   <>
    <div className="sidebarcontainer">
    {filterSidebar.map( item=> <Link className='side-item' to={item.route} >{item.value}</Link>)}
    </div>
   </>


  )
}

export default Sidebar