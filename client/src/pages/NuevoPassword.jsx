import React, { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { Link, useParams } from "react-router-dom";

export default function NuevoPassword() {
  const [password, setPasword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

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
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="nuevoPasswordContainer">
      <h1 className="nuevoPasswordTitle">
        Restablece tu password para tus{" "}
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
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="nuevoPasswordSubmit"
          />
        </form>
      )}
    </div>
  );
}
