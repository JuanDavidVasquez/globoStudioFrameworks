import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios'; 
import imageRegister from '../assets/img/globos_artisticos_3.jpg';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña es muy corta, debe tener al menos 6 caracteres',
        error: true
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post('/usuarios', { nombre, email, password });
      setAlerta({
        msg: data.msg,
        error: false
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Hubo un error, por favor intente de nuevo',
        error: true
      });
    }
  };

  useEffect(() => {
    if (alerta.msg) {
      if (alerta.error) {
        toast.error(alerta.msg);
      } else {
        toast.success(alerta.msg);
        // Redirigir después de 2 segundos si no es un error
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    }
  }, [alerta, navigate]); // Ejecutar el efecto cada vez que `alerta` o `navigate` cambien

  return (
    <div className='loginContainer'>
      <ToastContainer />
      <div className='loginLogin'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Name:</label>
            <input 
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="password2">Confirmar Password:</label>
            <input 
              type="password" 
              id="password2" 
              value={repetirPassword} 
              onChange={(e) => setRepetirPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className='loginImage'>
        <img src={imageRegister} alt='Register' />
      </div>
    </div>
  );
}
