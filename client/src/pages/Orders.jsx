import React, { useState, useEffect } from 'react';
import useOrder from '../hooks/useOrder';
import OrderSearch from '../homeAuth/components/admin/OrderSearch';
import ModalEditOrder from '../homeAuth/components/admin/ModalEditOrder'

const Orders = () => {
  const { orders, getOrders, updateOrderStatus } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearch = (searchTerm, status) => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order._id.includes(searchTerm) || 
        (order.user?.email && order.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (status) {
      filtered = filtered.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    setFilteredOrders(filtered);
  };

  const handleEditClick = (order) => {
    setOrderToEdit(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderToEdit(null);
  };

  const handleUpdateOrder = async (updatedOrder) => {
    try {
      await updateOrderStatus(updatedOrder);
      getOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="orders">
      <h2>Orders</h2>
      <OrderSearch orders={orders} onSearch={handleSearch} />
      <table>
        <thead>
          <tr className='trOrders'>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td className='tableOrders'>{order._id}</td>
                <td className='tableOrders'>{order.user?.email}</td>
                <td className='tableOrders'>{order.total}</td>
                <td className='tableOrders'>{order.status}</td>
                <td className='tableOrders'>
                  <button 
                    className='btn btn-primary' 
                    onClick={() => handleEditClick(order)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {isModalOpen && orderToEdit && (
        <ModalEditOrder 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onUpdate={handleUpdateOrder} 
          orderToEdit={orderToEdit._id} 
        />
      )}
    </div>
  );
};

export default Orders;
