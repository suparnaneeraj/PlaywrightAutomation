const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

// In-memory data
const USERS = [{ username: 'user', password: 'T0d0App!2024' }];
let todos = [];
let sessions = {};

// Middleware to check auth
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = sessions[token];
  next();
}

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Generate a simple token
  const token = crypto.randomBytes(16).toString('hex');
  sessions[token] = { username };
  res.json({ token });
});

// Get all todos
app.get('/api/todos', authMiddleware, (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/api/todos', authMiddleware, (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const todo = { id: crypto.randomUUID(), title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo
app.put('/api/todos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(idx, 1);
  res.status(204).send();
});

// Logout (optional)
app.post('/api/logout', authMiddleware, (req, res) => {
  const token = req.headers['authorization'];
  delete sessions[token];
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
