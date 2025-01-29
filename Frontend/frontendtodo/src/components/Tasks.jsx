import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import toast from "react-hot-toast";
const Tasks = () => {
  const { token,API_URL } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(token){

    axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        const formattedTasks = data.map((task) => ({
          ...task,
          dueDate: formatDate(task.dueDate),
        }));
        setTasks(formattedTasks);
      })
      .catch(() => toast.error('Failed to fetch tasks'));
    }

  }, [token]);

  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; 
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("task deleted successfully");

    } catch {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className='tasksStyle'>
      <div className='cardFlex'>
        <div>
          <p className='TasksName'>Pending Tasks</p>
          {tasks.map((task) => task.status == 'pending'&& (
            <div className={`${task.status=="pending"?'pendingStyle':'completedStyle'} + todoStyle`} key={task._id}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Status: {task.status}</p>
              <div className='btnFlex'>
              <Link className='test' style={{textDecoration:'none'}} to={`/addTasks/${task._id}`} >Edit</Link>
              <div className='test' onClick={() => deleteTask(task._id)}>Delete</div>
                </div>
            </div>
          ))}
        </div>

        <div>
        <p className='TasksName'>Completed Tasks</p>
          {tasks.map((task) => task.status == 'completed'&&(
            <div className={`${task.status=="pending"?'pendingStyle':'completedStyle'} + todoStyle`} key={task._id}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Status: {task.status}</p>
              <div className='btnFlex'>
              
              <Link className='test' style={{textDecoration:'none'}} to={`/addTasks/${task._id}`} >Edit</Link>
              <div className='test' onClick={() => deleteTask(task._id)}>Delete</div>
                </div>
            </div>
          ))}
        </div>
      </div>


      
    </div>
  );
};

export default Tasks;



