import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AppContent from './AppContent';
import Register from './pages/Register';
import ProjectDetail from './pages/Project';
import UserValidation from './components/UserValidation/UserValidation';
import LoadingPulsating from './components/LoadingPulsating';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import 'react-notifications-component/dist/theme.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <LoadingPulsating />
      <ReactNotifications />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<UserValidation />}>
            <Route element={<AppContent />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/project/:projectId" element={<ProjectDetail />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
