import { useAppDispatch, useAppSelector } from "./redux.hook"
import { useEffect } from 'react';
import { getProfile } from "../services/auth.service";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    const profileState = useAppSelector(store => store.profile)
    return profileState.profile.firstName != ''
  }