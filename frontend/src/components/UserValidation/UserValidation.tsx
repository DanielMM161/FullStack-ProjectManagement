import { Navigate, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth.hook';

function UserValidation() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default UserValidation;
