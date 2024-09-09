import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../assets/img/imgLogin.jpg";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      // Mostrar notificación de error si los campos están vacíos
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });

      // Mostrar notificación de éxito
      toast.success(data.msg);

      // Guardar token y redirigir
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/home");
    } catch (error) {
      // Mostrar notificación de error en caso de fallo
      toast.error(
        error.response?.data?.msg || "Hubo un error al iniciar sesión"
      );
    }
  };

  return (
    <div className="loginContainer">
      <ToastContainer /> 
      <div className="loginLogin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot your password? <Link to="/olvide-password">Recover password</Link>
        </p>
      </div>
      <div className="loginImage">
        <img src={imageLogin} alt="Login" />
      </div>
    </div>
  );
}
