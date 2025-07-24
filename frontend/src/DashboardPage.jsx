import { useEffect, useState } from 'react';
import { Typography, Box, Button, TextField, List, ListItem, ListItemText, IconButton, Checkbox, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Paper, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { token, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/todos', {
        headers: { Authorization: token }
      });
      setTodos(res.data);
    } catch {
      setError('Failed to fetch todos');
    }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post('http://localhost:3001/api/todos', { title: newTodo }, {
        headers: { Authorization: token }
      });
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch {
      setError('Failed to add todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`, {
        headers: { Authorization: token }
      });
      setTodos(todos.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/todos/${id}`, { completed: !completed }, {
        headers: { Authorization: token }
      });
      setTodos(todos.map(t => t.id === id ? res.data : t));
    } catch {
      setError('Failed to update todo');
    }
  };

  // Edit functionality
  const handleEditOpen = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditTodo(null);
    setEditTitle('');
  };

  const handleEditSave = async () => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(`http://localhost:3001/api/todos/${editTodo.id}`, { title: editTitle }, {
        headers: { Authorization: token }
      });
      setTodos(todos.map(t => t.id === editTodo.id ? res.data : t));
      handleEditClose();
    } catch {
      setError('Failed to update todo');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, {
        headers: { Authorization: token }
      });
    } catch {
      // ignore logout error
    }
    logout();
    navigate('/login');
  };

  return (
    <Box mt={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ height: 40 }}>
          Logout
        </Button>
      </Stack>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
          <TextField
            label="New Todo"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </form>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <List>
          {todos.map(todo => (
            <Paper key={todo.id} elevation={0} sx={{ mb: 2, p: 1, display: 'flex', alignItems: 'center' }}>
              <ListItem disablePadding sx={{ width: '100%' }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(todo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon>
                  <Checkbox checked={todo.completed} onChange={() => handleToggle(todo.id, todo.completed)} />
                </ListItemIcon>
                <ListItemText primary={todo.title} sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
              </ListItem>
            </Paper>
          ))}
        </List>
        {loading && <Typography>Loading...</Typography>}
      </Paper>
      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            label="Todo Title"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashboardPage;
