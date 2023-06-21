export interface SliceStateUser {
  users: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pictureProfile: string;
  avatar: string;
  created?: Date;
  token: string;
  tokenExpiration: string;
}

export const emptyUser: User = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  pictureProfile: '',
  avatar: '',
  token: '',
  tokenExpiration: ''
};

export const initialUserState: SliceStateUser = {
  users: [],
};
