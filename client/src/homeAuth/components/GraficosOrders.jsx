import React from 'react';
import Chart from 'react-apexcharts';

export const GraficosOrders = ({ data, categories }) => {
  const chartOptions = {
    series: [{
      name: 'Proyectos',
      data: data
    }],
    options: {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: categories
      },
      title: {
        text: 'Proyectos por Status'
      }
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        height="350"
      />
    </div>
  );
};
