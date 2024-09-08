import React from 'react';

export default function ModalEliminarProduct({ isOpen, onClose, onDelete, productToDelete }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete._id); 
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the product "{productToDelete?.name}"?</p>
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
