import React, { useState, useEffect } from 'react';
import useCategory from '../../../hooks/useCategory';

export default function CategorySearch({ onEdit, onDelete }) {
  const { categories, getCategories } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    getCategories(); // Cargar las categorías
  }, []);

  // Filtrar categorías en función del término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCategories(categories); // Si no hay término de búsqueda, mostrar todas las categorías
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered); // Mostrar las categorías filtradas
    }
  }, [searchTerm, categories]);

  return (
    <div className="category-search-container">
      <h2 className="search-title">Search Categories</h2>
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button
                    onClick={() => onEdit(category)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(category)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
