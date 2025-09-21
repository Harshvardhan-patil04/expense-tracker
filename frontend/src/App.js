import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles.css";

function App() {
  const [auth, setAuth] = useState(null); // { username, password }

  return (
    <Router>
      <Routes>
        {/* Signup page */}
        <Route path="/signup" element={auth ? <Navigate to="/" /> : <Signup />} />

        {/* Login page */}
        <Route path="/login" element={auth ? <Navigate to="/" /> : <Login setAuth={setAuth} />} />

        {/* Dashboard (protected) */}
        <Route path="/" element={auth ? <Dashboard auth={auth} setAuth={setAuth} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
