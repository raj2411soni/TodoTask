const express = require('express');
const Task = require('../models/Task');
const authenticateToken = require('../middlewares/authenticateToken');

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user._id });
      res.json(tasks);
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  }

exports.getTaskById =  async (req, res) => {
  
    try {
      const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
      if (!task) {
        // return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      res.status(400).send({ error: 'Error fetching task: ' + err.message });
    }
  }

exports.addTask = async (req, res) => {
    try {
      const { title, description, dueDate, status } = req.body;
      const task = new Task({ userId: req.user._id, title, description, dueDate, status });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  }

exports.editTask = async (req, res) => {
    try {
      const { title, description, dueDate, status } = req.body;
      const updatedTask = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { title, description, dueDate, status },
        { new: true }
      );
      if (!updatedTask) return res.status(404).send('Task not found');
      res.json(updatedTask);
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  }

exports.deleteTask = async (req, res) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
      if (!deletedTask) return res.status(404).send('Task not found');
      res.send('Task deleted successfully');
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  }