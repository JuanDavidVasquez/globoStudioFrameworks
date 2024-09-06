import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);

        toast.success(data.msg);
        setCuentaConfirmada(true);

        setTimeout(() => {
          navigate('/login');
        }, 3000); 
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error al confirmar cuenta");
      }
    };

    confirmarCuenta();
  }, [id, navigate]);

  return (
    <div className="confirm-container">
      <ToastContainer />
      <h1 className="confirm-title">
        Confirma tu cuenta y comienza <br /> a crear tus <span>proyectos</span>
      </h1>
      <div className="confirm-content">
        {cuentaConfirmada && (
          <Link className="confirm-link" to="/">
            Inicia Sesión
          </Link>
        )}
      </div>
    </div>
  );
}
