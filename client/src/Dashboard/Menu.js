import React from 'react';
import '../styles/Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHandBackFist } from "react-icons/fa6";
import { useSnackbar } from 'notistack';

const Menu = () => {
    const {enqueueSnackbar} = useSnackbar();
    const navigate=useNavigate()

    function adminLogOut(){
        fetch("https://ireporter-backend.onrender.com/logoutA",{
          method: 'DELETE'
        })
        //.then(setAdmin(null))
        .then(enqueueSnackbar('Admin logged out successfully', {variant:'success'}))
        .then(navigate('/'))
        .then(console.log())
      }
  return (
    <div className="menu-container">
      <div id="menu-logo">
        <FaHandBackFist className='text-color-white text-3xl'/>
        <h1 className='font-semibold'> I-Reporter</h1> 
      </div>
      <div className="menu-links">
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/redflags">Redflags</Link>
        <Link to="/admin/interventions">Intervention</Link>
      </div>
      <div className="logout" onclick={ ()=> adminLogOut}>Logout</div>
    </div>
  );
};

export default Menu;
