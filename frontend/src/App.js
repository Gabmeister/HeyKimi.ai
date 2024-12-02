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
import Company from "./pages/Company";

function App(){
  //auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  //dark mode :O
  const [darkMode, setDarkMode] = useState(false);

  const login =(user)=>{//mock for now
    console.log("Login function called");
    setIsAuthenticated(true);
    setUsername(user);
    console.log("isAuthenticated updated to true");
  };

  const logout =()=>{//mock for now
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <div className={darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} logout={logout} darkMode={darkMode} username={username}/>
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode}/>} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (<Dashboard isAuthenticated={isAuthenticated} darkMode={darkMode}/>)
              : (<Navigate to="/login" replace/>)
            }
          />
          <Route
            path="/login"
            element={<LoginPage login={login} isAuthenticated={isAuthenticated} darkMode={darkMode}/>}
          />
          <Route
            path="/pipeline"
            element={
              isAuthenticated ? (
                <Pipeline darkMode={darkMode}/>) 
                : (<Navigate to="/login" replace />)
            }
          />
          <Route
            path="/strategy"
            element={
              isAuthenticated ? (
                <Strategy darkMode={darkMode}/>) 
                : (<Navigate to="/login" replace />)
            }
          />
          <Route
            path="/company"
            element={
              isAuthenticated ? (
                <Company darkMode={darkMode}/>) 
                : (<Navigate to="/login" replace />)
            }
          />
          <Route
            path="/activity"
            element={
              isAuthenticated ? (<Activity darkMode={darkMode}/>) 
              : (<Navigate to="/login" replace />)
            }
          />
          <Route
            path="/account"
            element={
              isAuthenticated ? (
                <Account username={username} darkMode={darkMode} setDarkMode={setDarkMode} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;