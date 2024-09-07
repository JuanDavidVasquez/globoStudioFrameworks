import React from 'react';
import './Loading.css'; // Asegúrate de crear este archivo CSS

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
}
