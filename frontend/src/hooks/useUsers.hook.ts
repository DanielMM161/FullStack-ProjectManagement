import { useEffect, useState } from 'react';

import { User } from '../models/user';

import { HttpService } from '../services/HttpService';

function useUsers() {  
  const service = new HttpService("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {  
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const result = await service.get<User>('users');
    if (result)  setAllUsers(result);
  }

  return { allUsers };
}

export default useUsers;
