import React, { useState } from 'react';
import axios from 'axios';
import loginBg from '../assets/loginBg.jpg'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import openEye from "../assets/openEye.png";
import closeEye from "../assets/closeEye.png";
const Register = () => {
  const navigate = useNavigate(); 
  const {  API_URL } = useAuth();
  const [showResetOnePassword, setShowResetOnePassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/signup`, { username, password });
      navigate('/login');

      toast.success("user Registered successfully");

    } catch (err) {
      toast.error('Registration failed ' + err.response?.data || err.message);
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

      <h2 className='regName'>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        className='inp'
        onChange={handleChange}
        required
      />
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
      <button className='btns' type="submit">Register</button>
      </div>
    </form>
  );
};

export default Register;
