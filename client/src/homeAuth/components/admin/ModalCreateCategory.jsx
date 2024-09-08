import React, { useState, useEffect } from 'react';
import useCategory from '../../../hooks/useCategory';

export default function ModalCreateCategory({ isOpen, onClose, onCreate, categoryToEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { createCategory, updateCategory } = useCategory();

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || '');
      setDescription(categoryToEdit.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que ambos campos estén completos
    if (name.trim() === '' || description.trim() === '') {
      alert('Please fill out both fields.');
      return;
    }

    try {
      if (categoryToEdit) {
        // Actualizar categoría existente
        await updateCategory({ id: categoryToEdit._id, name, description });
      } else {
        // Crear nueva categoría
        await createCategory({ name, description });
      }

      // Llamar a la función onCreate para actualizar la lista de categorías
      onCreate();

      // Limpiar los campos del formulario si es una nueva categoría
      if (!categoryToEdit) {
        setName('');
        setDescription('');
      }

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{categoryToEdit ? 'Edit Category' : 'Create Category'}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              {categoryToEdit ? 'Save Changes' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
