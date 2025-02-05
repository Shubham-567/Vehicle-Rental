import { AuthProvider } from "./context/AuthContext.jsx";
import { VehicleProvider } from "./context/VehicleContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <VehicleProvider>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Home />} />
            </Routes>
          </Router>
        </VehicleProvider>
      </AuthProvider>
    </>
  );
}

export default App;
