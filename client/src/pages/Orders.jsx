import React, { useState, useEffect } from 'react';
import useOrder from '../hooks/useOrder';
import OrderSearch from '../homeAuth/components/admin/OrderSearch';

const Orders = () => {
  const { orders, getOrders } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState([]);

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
                <td className='tableOrders'><button className='btn btn-primary'>Editar</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
