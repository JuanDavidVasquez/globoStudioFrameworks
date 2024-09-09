import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from '../config/clienteAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const [peticionOk, setPeticionOk] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que el email no esté vacío y tenga al menos 6 caracteres
    if (email === '' || email.length < 6) {
      setAlerta({
        msg: "Email es obligatorio y debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
  
    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });

      toast.success(data.msg);
      setAlerta({
        msg: data.msg,
        error: false,
      });  
      setPeticionOk(true);

    } catch (error) {
      // Verifica si el error tiene una respuesta y maneja los posibles errores
      if (error.response && error.response.data && error.response.data.msg) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      } else {
        toast.error(
          error.response?.data?.msg || "Hubo un error"
        );
        setAlerta({
          msg: "Error en la solicitud",
          error: true,
        });
      }
    }
  };
  

  const { msg } = alerta;

  console.log(peticionOk);

  return (
    <div className="olvidePasswordContainer">
    <ToastContainer /> 
    <div className='effectGlass'>
      <h1 className="olvidePasswordTitle">
        Recuperar tu acceso y no pierdas tus{" "}
        <span className="olvidePasswordSpan">proyectos</span>
      </h1>

      {peticionOk === false ? (<form className="olvidePasswordForm" onSubmit={handleSubmit}>
        <div className="olvidePasswordInputContainer">
          <label htmlFor="email" className="olvidePasswordLabel">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="olvidePasswordInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar instrucciones"
          className="olvidePasswordSubmit"
        />
      </form>):
        <Link to="/login" className="olvidePasswordLink">Go to Login</Link>
    }

      <div className="olvidePasswordNav">
        <Link className="olvidePasswordLink" to="/login">
          ¿Ya tienes una cuenta? Inicia Sesión.
        </Link>
        <Link className="olvidePasswordLink" to="/register">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
      </div>
    </div>
  );
}
