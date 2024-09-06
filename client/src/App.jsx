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

            <Route path="/login" element={<Login />} />
            <Route path="/register" element=<Register/> />
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
