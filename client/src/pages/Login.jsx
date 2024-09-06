import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../assets/img/imgLogin.jpg";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta,setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e =>{

    e.preventDefault();
    if([email,password].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      });
      return
    }
   
    try {
   
      const { data } = await clienteAxios.post('/usuarios/login', { email, password })

      setAlerta({
        msg:data.msg,
        error:false
      }) 
      localStorage.setItem('token',data.token);
      setAuth(data);
      navigate('/home')
    } catch (error) {
     console.error(error)
    }

  }



  return (
    <div className="loginContainer">
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
      </div>
      <div className="loginImage">
        <img src={imageLogin} alt="Login" />
      </div>
    </div>
  );
}
