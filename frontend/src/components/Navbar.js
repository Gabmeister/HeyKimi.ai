import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kimilogo.png";


const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav className="bg-white text-black h-screen fixed top-0 left-0 flex flex-col p-4 w-40">
      {/*borderless - logo section on top*/}
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-10" style={{ marginLeft: "-20px" }}> 
          <Link to="/">
            <img src={logo} alt="Kimi Logo" className="cursor-pointer full" />
          </Link>
        </div>
      </div>

      {/* content encapsulated by border*/}
      <div className="flex-grow flex flex-col border-r border-black" style={{ paddingRight: "20px" }}>
        {/*navlinks*/}
        <ul className="flex flex-col space-y-4 items-center">
          {isAuthenticated && (
            <li>
              <Link
                to="/dashboard"
                className="hover:text-purple-400 transition duration-300 text-lg text-center"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/*login/logout at the bottom*/}
        <div className="mt-auto">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hover:text-purple-400 transition duration-300 text-lg text-center block"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="hover:text-purple-500 transition duration-300 text-lg text-center w-full bg-transparent focus:outline-none py-2 rounded"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;