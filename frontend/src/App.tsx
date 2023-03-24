import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import AppContent from './AppContent';
import Register from './pages/Register/Register';
import ProjectDetail from './pages/Project/ProjectDetail';
import UserValidation from './components/UserValidation/UserValidation';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import LoadingPulsating from './components/LoadingPulsating';

function App() {
  return (
    <BrowserRouter>
      <LoadingPulsating />
      <ReactNotifications />
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
    </BrowserRouter>
  );
}

export default App;
