import React from 'react';

export default function ModalEliminarCategory({ isOpen, onClose, onDelete, categoryToDelete }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(categoryToDelete._id); // Pasar el ID de la categoría a eliminar
    onClose(); // Cerrar el modal después de la eliminación
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the category "{categoryToDelete.name}"?</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
