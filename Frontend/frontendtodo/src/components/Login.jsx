import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import loginBg from '../assets/loginBg.jpg'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import openEye from "../assets/openEye.png";
import closeEye from "../assets/closeEye.png";
const Login = () => {
  const navigate = useNavigate(); 
  const { login, API_URL } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showResetOnePassword, setShowResetOnePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/login`, { username, password });
      login(data.token);
      navigate('/tasks');
      toast.success("logged in successfully");

    } catch (err) {
      toast.error('Login failed');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.includes(' ')) { 
      setUsername(value);
    } 
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (!value.includes(' ')) {
      
      setPassword(value);
    } 
  };

  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <div className='leftside'>
        <img src={loginBg} style={{width:'100%'}}/>
      </div>

      <div className='loginDiv'>
      <h2 className='regName' >Login</h2>
        <input 
          className='inp'
        type="text" placeholder="Username" value={username} onChange={handleChange} required />

        <div className="setPassEyeDiv">
        <input 
          className='inp'
          type={showResetOnePassword ? "text" : "password"}
          placeholder="Password" value={password} onChange={handlePasswordChange} required />

        <img
          src={showResetOnePassword ? openEye : closeEye}
          onClick={() => setShowResetOnePassword(!showResetOnePassword)}
          className="setPassEyeImg"
        />
        </div>

        <button className='btns' type="submit">Login</button>
      </div>
     
    </form>
  );
};

export default Login;