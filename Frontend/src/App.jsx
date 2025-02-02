import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/dashboard' element={<h2>Login success..</h2>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
