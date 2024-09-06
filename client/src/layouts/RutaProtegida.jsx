import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando....";

  return (
    <div>
      {auth._id ? (

            <main className="p-10 flex-1">
              <Outlet />
            </main>
      
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
}
