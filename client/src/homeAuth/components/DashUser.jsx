import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const categories = [
  { id: 1, name: 'Globos' },
  { id: 2, name: 'Decoraciones' },
  { id: 3, name: 'Globos Artísticos' }
];

const products = [
  { id: 1, categoryId: 1, name: 'Globo Azul', price: 10 },
  { id: 2, categoryId: 1, name: 'Globo Rojo', price: 12 },
  { id: 3, categoryId: 2, name: 'Guirnalda', price: 20 },
  { id: 4, categoryId: 2, name: 'Confeti', price: 5 },
  { id: 5, categoryId: 3, name: 'Globo Arte 1', price: 15 },
  { id: 6, categoryId: 3, name: 'Globo Arte 2', price: 18 },
  { id: 7, categoryId: 3, name: 'Globo Arte 3', price: 25 },
  { id: 8, categoryId: 3, name: 'Globo Arte 4', price: 22 },
  { id: 9, categoryId: 3, name: 'Globo Arte 5', price: 30 }
];

const orders = [
  { id: 1, category: 'Globos', product: 'Globo Azul', price: 10 },
  { id: 2, category: 'Decoraciones', product: 'Guirnalda', price: 20 }
];

export default function DashUser() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const chartOptions = {
    series: [{
      name: 'Proyectos',
      data: [10, 20, 15, 30]
    }],
    options: {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: ['Pending', 'Creación', 'Envío', 'Montaje']
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
    return order.price;
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

      <h2 className='ultimosPedidos'>Ultimos Pedidos</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', gap:'2rem', flexWrap:'wrap' }}>
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleCardClick(order)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '200px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <h4>{order.category}</h4>
            <p>{order.product}</p>
            <p><strong>Valor:</strong> ${totalValue(order)}</p>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Factura Detallada</h3>
          <p><strong>Categoría:</strong> {selectedOrder.category}</p>
          <p><strong>Producto:</strong> {selectedOrder.product}</p>
          <p><strong>Precio:</strong> ${selectedOrder.price}</p>
          {/* Aquí puedes agregar más detalles según sea necesario */}
        </div>
      )}
    </div>
  );
}
