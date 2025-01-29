import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import bgadd from '../assets/bgadd.jpg'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
const Tasksnew = () => {
  const {isEdit} = useParams()
  const navigate = useNavigate(); 

 
  const { token,API_URL } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending'); 
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks
  useEffect(() => {
    if (isEdit){
    var url =`${API_URL}/tasks/${isEdit}` 
    axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if(isEdit){
          setEditingTaskId(data._id);
          setTitle(data.title);
          setDescription(data.description);
          setDueDate(formatDate(data.dueDate)); 
          setStatus(data.status);
        }
      });
    }

      
  }, [token,isEdit]);

  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; 
  };


  const addTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/tasks`,
        { title,description,dueDate, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("task added successfully");

      navigate('/tasks');
    } catch {
      toast.error('Failed to add task');
    }
  };

 


  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_URL}/tasks/${editingTaskId}`,
        {
          title,
          description,
          dueDate,
          status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast.success("task updated successfully");

      navigate('/tasks');

    } catch {
      toast.error('Failed to update task');
    }
  };


  return (
   
     
      <div className='addStyle'>
        <div className='leftside'>
                <img src={bgadd} style={{width:'100%'}}/>
              </div>
      <form className='setForm' onSubmit={editingTaskId ? updateTask : addTask}>
      <h2 className='regName' >{isEdit?'Edit Task':'Add Task'}</h2>

        <input
          type="text" className='inp'
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text" className='inp'
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date" className='inp'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select value={status} style={{width:'358px'}} className='inp' onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button className='btns' type="submit">{editingTaskId ? 'Edit Task' : 'Add Task'}</button>
      </form>
      </div>

  );
};

export default Tasksnew;
