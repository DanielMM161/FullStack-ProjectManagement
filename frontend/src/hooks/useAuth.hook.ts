import { useAppSelector } from './redux.hook';
import { CompareDates } from '../utils/common';

const useAuth = () => {  
  const profileState = useAppSelector((store) => store.profile);
  const { profile } = profileState;

  /**
   * Return true if the current date is higher than the token expiration
   * @returns 
   */
  function checkTokenExpiration(): boolean {
    return CompareDates(profile.tokenExpiration)
  }
  
  return profile.firstName !== '' && !checkTokenExpiration();
};

export default useAuth;
