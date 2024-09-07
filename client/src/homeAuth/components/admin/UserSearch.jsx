import React, { useState } from 'react';

const UserSearch = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
  // Filtrar usuarios en función del término de búsqueda
  const filteredUsers = users.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm) || 
    user.email.toLowerCase().includes(searchTerm)
  );
  
  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="user-search-results">
        {filteredUsers.length === 0 ? (
          <p className="no-results">No se encontraron coincidencias.</p>
        ) : (
          filteredUsers.map(user => (
            <div key={user._id} className="user-card">
              <div className="user-details">
                <h2 className="user-name">{user.nombre}</h2>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserSearch;
