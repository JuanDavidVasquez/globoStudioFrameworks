import React, { useState, useEffect } from 'react';
import useProducts from '../../../hooks/useProducts';

export default function ProductSearch({ onEdit, onDelete }) {
  const { products, getProducts } = useProducts(); // Obtener productos en lugar de categorías
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts(); // Cargar los productos al montar el componente
  }, []);

  // Filtrar productos en función del término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products); // Si no hay término de búsqueda, mostrar todos los productos
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered); // Mostrar los productos filtrados
    }
  }, [searchTerm, products]);

  return (
    <div className="product-search-container">
      <h2 className="search-title">Search Products</h2>
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
            <th>Price</th> 
            <th>Category</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category_id?.name}</td>
                <td>
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(product)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td> {/* Cambiado para reflejar el número de columnas */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
