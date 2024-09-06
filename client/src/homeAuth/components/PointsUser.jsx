import React, { useContext, useEffect } from 'react';
import Chart from 'react-apexcharts';
import usePoint from '../../hooks/usePoints';

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

  const { points, getPoints } = usePoint();
  

  const handleGetPoints = () => {
    getPoints();
  }
  const totalSavings = points;
  useEffect(() => {
    handleGetPoints();
  }, []);




  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>

<div className='pointsGeneralAccumulated'>
  Total Points: {points.accumulated}
</div>


      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A90E2' }}>Mi Historial de Puntos</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '40px',
        gap: '20px',
        fontSize: '1.5em',
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
    </div>
  );
}
