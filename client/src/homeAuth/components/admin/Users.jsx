import React, { useEffect, useState } from 'react';
import './adminCss.css'; 
import useUser from '../../../hooks/useUser';
import UserSearch from './UserSearch';
import Loading from '../../../ui/Loading';


const Users = () => {
  const { users, getUsers } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="users-container">
      <h1 className="title-users">Usuarios</h1>
      <UserSearch users={users} />
    </div>
  );
}

export default Users;
