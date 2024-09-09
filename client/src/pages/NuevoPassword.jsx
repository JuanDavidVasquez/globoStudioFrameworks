import React, { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        toast.error(error.response.data.msg);
      }
    };
    comprobarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser mínimo de 6 caracteres",
        error: true,
      });
      toast.error("El Password debe ser mínimo de 6 caracteres");
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      toast.success(data.msg);
      setPasswordModificado(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      toast.error(error.response.data.msg);
    }
  };

  const { msg } = alerta;

  return (
    <div className="nuevoPasswordContainer">
      <h1 className="nuevoPasswordTitle">
        Restablece tu password para ver tus{" "}
        <span className="nuevoPasswordSpan">proyectos</span>
      </h1>

      {passwordModificado && (
        <Link className="nuevoPasswordLink" to="/">
          Inicia Sesión.
        </Link>
      )}

      {tokenValido && (
        <form className="nuevoPasswordForm" onSubmit={handleSubmit}>
          <div className="nuevoPasswordInputContainer">
            <label htmlFor="password" className="nuevoPasswordLabel">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe Tu Nuevo Password"
              className="nuevoPasswordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="nuevoPasswordSubmit"
          />
        </form>
      )}

      <ToastContainer />
    </div>
  );
}
