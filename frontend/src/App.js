import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, {useState} from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App(){
  //auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login =()=>{//mock for now
    setIsAuthenticated(true);
  };

  const logout =()=>{//mock for now
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={<LoginPage login={login} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;