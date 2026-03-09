const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB locally'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const taskSchema = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String },
    cat: { type: String, default: 'General' },
    code: { type: String }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// Auth Endpoints
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error during signup', error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ username: user.username });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
});

// Task Endpoints
app.get('/api/tasks/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const tasks = await Task.find({ username });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
});

app.post('/api/tasks/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { text, date, cat, code } = req.body;
        const newTask = new Task({ username, text, date, cat, code });
        await newTask.save();
        
        const tasks = await Task.find({ username });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error adding task', error: err.message });
    }
});

app.put('/api/tasks/:username/:id', async (req, res) => {
    try {
        const { username, id } = req.params;
        const updatedData = req.body;
        
        await Task.findByIdAndUpdate(id, updatedData);
        const tasks = await Task.find({ username });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
});

app.delete('/api/tasks/:username/:id', async (req, res) => {
    try {
        const { username, id } = req.params;
        await Task.findByIdAndDelete(id);
        const tasks = await Task.find({ username });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
