import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hook';
import { getProfile } from '../redux/slice/ProfileSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((store) => store.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
    
  return profileState.profile.firstName !== '';
};

export default useAuth;
