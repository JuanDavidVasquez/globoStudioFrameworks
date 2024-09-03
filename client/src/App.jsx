import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { HomeAuth } from "./pages/HomeAuth";
import { HomeProvider } from "./context/HomeProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HomeProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/home" element={<HomeAuth />} />
          </Routes>
        </HomeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
