
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth.hook';

export const UserValidation = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to={'/login'}/>
}