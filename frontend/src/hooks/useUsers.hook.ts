import { useEffect, useState } from 'react';

import { User } from '../models/user';
import getAllUsers from '../services/user';

import { useAppDispatch } from './redux.hook';

function useUsers() {
  const dispatch = useAppDispatch();
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = () => {
      dispatch(getAllUsers()).then((response) => {
        const result = response.payload as User[];
        setAllUsers(result);
      });
    };
    fetchUsers();
  }, [dispatch]);

  return { allUsers };
}

export default useUsers;
