import React, { useState, useEffect } from 'react';

const OrderSearch = ({ orders = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Filtrar las órdenes en función del término de búsqueda y el estado
    if (searchTerm || selectedStatus) {
      const filteredSuggestions = orders.filter(order =>
        (order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.email.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (selectedStatus ? order.status.toLowerCase() === selectedStatus.toLowerCase() : true)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, selectedStatus, orders]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Actualizar el estado del componente padre con el término de búsqueda
    onSearch(value, selectedStatus);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    // Actualizar el estado del componente padre con el estado seleccionado
    onSearch(searchTerm, value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion._id); // O usa otro campo si lo prefieres
    onSearch(suggestion._id, selectedStatus);
    setSuggestions([]);
  };

  return (
    <div className="order-search">
      <h2>Search Orders</h2>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter order ID or customer email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="pendiente">Pending</option>
          <option value="creacion">Creación</option>
          <option value="montaje">Montaje</option>
          <option value="envio">Envio</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
          {/* Añade aquí más opciones si tienes otros estados */}
        </select>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(suggestion => (
            <li key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion._id} - {suggestion.user?.email} - {suggestion.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderSearch;
