import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";

const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      navigate('/login');
      logout();
      toast.success("logged out successfully");
    };
  
    return (
      <div className='HeaderMain'>
        <p className='headingText '>TODO </p>
        {token ? (
          <>
          <div style={{display:'flex',gap:'40px'}}>
            <Link className='menu' to="/tasks">Tasks List</Link>
            <Link className='menu' to="/addTasks">Add Task</Link>
          </div>
            <div className='btnOut' onClick={handleLogout}>Logout</div>
          </>
        ) : (
          <>
          <div style={{display:'flex',gap:'20px'}}>

            <Link className='btnOut' to="/login">Login</Link>
            <Link className='btnOut' to="/register">Register</Link>
          </div>
          </>
        )}
      </div>
    );
  };

  export default Header;