import React, { useEffect, useState } from 'react';
import { getUsers } from '/apis/api.js'; // Assurez-vous que le chemin est correct

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    });
  }, []);

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
