import React from 'react';
import Chart from 'react-apexcharts';

const pointsData = {
  earned: [
    { date: '2024-09-01', description: 'Compra en Globo Azul', points: 100 },
    { date: '2024-09-10', description: 'Compra en Decoraciones', points: 200 },
  ],
  redeemed: [
    { date: '2024-09-15', description: 'Canje de Globo Rojo', points: 150, savings: 30 },
    { date: '2024-09-20', description: 'Canje de Globo Arte 1', points: 200, savings: 50 },
  ]
};

const totalSavings = pointsData.redeemed.reduce((total, item) => total + item.savings, 0);

export default function PointsUser() {
  const chartOptions = {
    series: [{
      name: 'Ahorro Acumulado',
      data: [totalSavings]
    }],
    options: {
      chart: {
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: () => `${totalSavings} USD`
            }
          }
        }
      },
      title: {
        text: 'Ahorro por Canje de Puntos',
        align: 'center',
        style: {
          fontSize: '20px',
          color: '#666'
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A90E2' }}>Mi Historial de Puntos</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '40px',
        gap: '20px'
      }}>
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          background: '#f9f9f9',
          width: '45%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Puntos Ganados</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #4A90E2' }}>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Descripción</th>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {pointsData.earned.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px 0' }}>{item.date}</td>
                  <td style={{ padding: '10px 0' }}>{item.description}</td>
                  <td style={{ padding: '10px 0' }}>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          background: '#f9f9f9',
          width: '45%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Puntos Canjeados</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #4A90E2' }}>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Descripción</th>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Puntos</th>
                <th style={{ padding: '10px 0', textAlign: 'left' }}>Ahorro</th>
              </tr>
            </thead>
            <tbody>
              {pointsData.redeemed.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px 0' }}>{item.date}</td>
                  <td style={{ padding: '10px 0' }}>{item.description}</td>
                  <td style={{ padding: '10px 0' }}>{item.points}</td>
                  <td style={{ padding: '10px 0' }}>${item.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="radialBar"
          height="350"
        />
      </div>
    </div>
  );
}
