import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Register from './components/Register';
import Header from './components/Header';
import Tasksnew from './components/addTasks';
import {Toaster} from 'react-hot-toast';


const App = () => {
  
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addTasks/:isEdit?" element={<Tasksnew />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
