const express = require('express');
const Task = require('../models/Task');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAllTasks, getTaskById, addTask, editTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', authenticateToken, getAllTasks);

router.get('/tasks/:id', authenticateToken,getTaskById);

router.post('/tasks', authenticateToken, addTask);
  
router.put('/tasks/:id', authenticateToken, editTask);
  
router.delete('/tasks/:id', authenticateToken, deleteTask);

module.exports = router;