import React from "react";
import {Link} from "react-router-dom";

const Navbar = () =>{
  return(
    <nav className="bg-purple-900 text-white p-4" style={{ backgroundColor: "#0E0915" }}>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className="hover:text-purple-400 transition duration-300"
          >
            LandingPage
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="hover:text-purple-400 transition duration-300"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="hover:text-purple-400 transition duration-300"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;