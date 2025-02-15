const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/ToDo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));


app.use('/api', userRoutes);
app.use('/api', taskRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));