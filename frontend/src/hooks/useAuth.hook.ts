import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hook';
import { getProfile } from '../services/auth.service';

const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
    console.log(' profileState.profile.firstName', profileState.profile.firstName);
  }, [dispatch]);

  const profileState = useAppSelector((store) => store.profile);
  return profileState.profile.firstName !== '';
};

export default useAuth;
