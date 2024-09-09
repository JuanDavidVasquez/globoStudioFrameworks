import React, { useState, useEffect } from 'react';
import useOrder from '../../../hooks/useOrder';

export default function ModalEditOrder({ isOpen, onClose, onUpdate, orderToEdit }) {
  const [status, setStatus] = useState('');
  const { updateOrderStatus } = useOrder();

  useEffect(() => {
    if (orderToEdit) {
      setStatus(orderToEdit.status || '');
    } else {
      setStatus('');
    }
  }, [orderToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el campo status esté completo
    if (status.trim() === '') {
      alert('Please select a status.');
      return;
    }

    try {
      // Construir el objeto para actualizar
      const updatedOrder = {
        id: orderToEdit,
        status
      };

      // Enviar la solicitud de actualización
      await updateOrderStatus(updatedOrder);

      // Llamar a la función onUpdate para actualizar la lista de órdenes
      onUpdate();

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
        <h2>Edit Order {orderToEdit._id}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="pendiente">Pending</option>
              <option value="creacion">Creación</option>
              <option value="envio">Envío</option>
              <option value="montaje">Montaje</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
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
