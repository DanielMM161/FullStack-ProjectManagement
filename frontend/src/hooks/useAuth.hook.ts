import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hook';
import { getProfile } from '../services/auth';

const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const profileState = useAppSelector((store) => store.profile);
  return profileState.profile.firstName !== '';
};

export default useAuth;
