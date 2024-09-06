import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import useUser from '../../hooks/useUser';

export default function DashUser() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pending, setPending] = useState(0);
  const [creation, setCreation] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [montage, setMontage] = useState(0);

  const { getMyOrders, myOrders } = useUser();

  useEffect(() => {
    getMyOrders();

    // Filtrar por estado de las órdenes
    setPending(myOrders.filter(order => order.order.status === 'pendiente').length);
    setCreation(myOrders.filter(order => order.status === 'creación').length);
    setShipping(myOrders.filter(order => order.status === 'envío').length);
    setMontage(myOrders.filter(order => order.status === 'montaje').length);
  }, []);

  const chartOptions = {
    series: [{
      name: 'Proyectos',
      data: [pending, creation, shipping, montage]
    }],
    options: {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: ['Pendiente', 'Creación', 'Envío', 'Montaje']
      },
      title: {
        text: 'Proyectos por Status'
      }
    }
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const totalValue = (order) => {
    return order.total;  // Usar el total de la orden
  };

  return (
    <div style={{ padding: '20px', width:'100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height="350"
        />
      </div>

      <h2 className='ultimosPedidos'>Últimos Pedidos</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', gap:'2rem', flexWrap:'wrap' }}>
        {myOrders.map((order) => (
          <div
            key={order._id}
            onClick={() => handleCardClick(order)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '2em',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <h4>Orden ID: {order.order._id}</h4>
            <p><strong>Status:</strong> {order.order.status}</p>
            <p><strong>Total:</strong> ${totalValue(order.order)}</p>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
        className='facturaDetallada'
        >
          <h3>Factura Detallada</h3>
          <p><strong>ID de la Orden:</strong> {selectedOrder.order._id}</p>
          <p><strong>Status:</strong> {selectedOrder.order.status}</p>
          <h4>Items:</h4>
          <ul>
            {selectedOrder.orderItems.map((item, index) => (
              <li key={index}>
                <p>Producto: {item.product_id.name}, Cantidad: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <p><strong>Subtotal:</strong> ${selectedOrder.order.subtotal}</p>
          <p><strong>Total:</strong> ${selectedOrder.order.total}</p>
          
        </div>
      )}
      
    </div>
  );
}
