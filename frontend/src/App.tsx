import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import AppContent from './AppContent';
import Register from './pages/Register/Register';
import ProjectDetail from './pages/Project/ProjectDetail';
import UserValidation from './components/UserValidation/UserValidation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppContent />}>
          <Route element={<UserValidation />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/project/:projectId" element={<ProjectDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
