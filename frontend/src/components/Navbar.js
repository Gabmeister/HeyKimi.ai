import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kimilogo.png";

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav className="bg-white text-black h-screen fixed top-0 left-0 flex flex-col p-4 w-40">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-10" style={{ marginLeft: "-20px" }}>
          <img src={logo} alt="Kimi Logo" className="full" />
        </div>
      </div>

      {/* Border & Links Section */}
      <div className="flex-grow flex flex-col border-r border-black" style={{ paddingRight: '20px' }}>
        <ul className="flex flex-col space-y-4 items-center">
          <li>
            <Link
              to="/"
              className="hover:text-purple-400 transition duration-300 text-lg text-center"
            >
              Home
            </Link>
          </li>
          {!isAuthenticated ? (
            <li>
              <Link
                to="/login"
                className="hover:text-purple-400 transition duration-300 text-lg text-center"
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-purple-400 transition duration-300 text-lg text-center"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:text-purple-400 transition duration-300 text-lg text-center"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};


export default Navbar;