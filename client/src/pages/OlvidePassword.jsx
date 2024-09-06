import React, { useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../config/clienteAxios';

export default function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: "Email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="olvidePasswordContainer">
      <h1 className="olvidePasswordTitle">
        Recuperar tu acceso y no pierdas tus{" "}
        <span className="olvidePasswordSpan">proyectos</span>
      </h1>

      <form className="olvidePasswordForm" onSubmit={handleSubmit}>
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
      </form>

      <div className="olvidePasswordNav">
        <Link className="olvidePasswordLink" to="/login">
          ¿Ya tienes una cuenta? Inicia Sesión.
        </Link>
        <Link className="olvidePasswordLink" to="/register">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
    </div>
  );
}
