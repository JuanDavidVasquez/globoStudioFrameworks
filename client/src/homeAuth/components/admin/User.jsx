import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import imagenUpdateUser from '../../../assets/img/globos_artisticos_4.jpg';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function User() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  });

 
  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id || '',
        nombre: user.nombre || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
   setFormData({
      nombre: '',
      email: '',
    });
    toast.success("Usuario actualizado correctamente");
  };

  return (
    <> <ToastContainer />
    <div className="user-form-container">
      <form onSubmit={handleSubmit}>
      <h1>Actualizar Usuario</h1>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      <img src={imagenUpdateUser} alt="Imagen de usuario"/>  
    </div>
    </>
  );
}
