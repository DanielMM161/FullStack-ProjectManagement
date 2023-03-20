export interface SliceStateUser {
  users: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  created?: Date;
}

export const emptyUser: User = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
};

export const initialUserState: SliceStateUser = {
  users: [],
};
