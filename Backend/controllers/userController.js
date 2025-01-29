const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.signupUser =  async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
}

exports.login = async (req, res) => {
    try {
      let { username, password } = req.body;
      username = username.trim()
      const user = await User.findOne({ username });
      if (!user) return res.status(404).send('User not found');
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send('Invalid credentials');
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  }

exports.logout = (req, res) => {
    res.status(200).send('Logged out successfully');
}