import React, { useEffect, useState } from 'react';
import { GraficosOrders } from './GraficosOrders'; // Asegúrate de importar correctamente
import useUser from '../../hooks/useUser';
import Loading from '../../ui/Loading';

export default function DashUser() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pending, setPending] = useState(0);
  const [creation, setCreation] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [montage, setMontage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { getMyOrders, myOrders } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getMyOrders();
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && myOrders.length > 0) {
      setPending(myOrders.filter(order => order.order.status === 'pendiente').length);
      setCreation(myOrders.filter(order => order.order.status === 'creacion').length);
      setShipping(myOrders.filter(order => order.order.status === 'envio').length);
      setMontage(myOrders.filter(order => order.order.status === 'montaje').length);
    }
  }, [myOrders, loading]);

  const chartData = [pending, creation, shipping, montage];
  const chartCategories = ['Pendiente', 'Creación', 'Envío', 'Montaje'];

  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const totalValue = (order) => {
    return order.total;
  };

  return (
    <div style={{ padding: '20px', width: '100%', minHeight: '90vh' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <GraficosOrders data={chartData} categories={chartCategories} />

          <h2 className='ultimosPedidos'>Últimos Pedidos</h2>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', gap: '2rem', flexWrap: 'wrap' }}>
            {myOrders.map((order) => (
              <div
                key={order.order._id}
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
        </>
      )}
    </div>
  );
}
