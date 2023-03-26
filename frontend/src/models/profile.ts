import { emptyUser, User } from './user';

export interface ProfileInitialState {
  profile: User;
}

export const initialProfileState: ProfileInitialState = (() => {
  const data = JSON.parse(localStorage.getItem('profile') ?? 'null');
  return {
    profile: data ?? emptyUser,
  };
})();
