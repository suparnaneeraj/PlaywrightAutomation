import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import { AuthProvider } from './auth';
import { useAuth } from './authContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={localStorage.getItem('token') ? "/dashboard" : "/login"} />} />
          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
