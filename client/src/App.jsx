import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { HomeAuth } from "./pages/HomeAuth";
import { HomeProvider } from "./context/HomeProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layouts/RutaProtegida";
import { PointProvider } from "./context/PointsProvider";
import { UserProvider } from "./context/UserProvider";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <HomeProvider>
              <PointProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />

                  <Route path="registrar" element={<Register />} />
                  <Route path="olvide-password" element={<OlvidePassword/>} />
                  <Route
                    path="olvide-password/:token"
                    element={<NuevoPassword />}
                  />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element=<Register /> />
                  <Route path="/home" element={<RutaProtegida />}>
                    <Route index element={<HomeAuth />} />
                  </Route>
                </Routes>
              </PointProvider>
            </HomeProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
