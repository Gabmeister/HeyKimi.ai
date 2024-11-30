import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, {useState} from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Pipeline from "./pages/Pipeline";
import Strategy from "./pages/Strategy";
import Activity from "./pages/Activity";
import Account from "./pages/Account";

function App(){
  //auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login =()=>{//mock for now
    console.log("Login function called");
    setIsAuthenticated(true);
    console.log("isAuthenticated updated to true");
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
            isAuthenticated ? (<Dashboard isAuthenticated={isAuthenticated}/>) : (<Navigate to="/login" replace/>)
          }
        />
        <Route
          path="/login"
          element={<LoginPage login={login} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/pipeline"
          element={
            isAuthenticated ? (
              <Pipeline />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/strategy"
          element={
            isAuthenticated ? (
              <Strategy />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/activity"
          element={
            isAuthenticated ? (
              <Activity />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <Account />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;