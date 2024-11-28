import React, {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";

const LoginPage = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({ username: "", password: ""});
  const [error, setError] = useState("");

  const handleChange = (e) =>{//handle login form changes
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) =>{//form submission
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", formData);
      if (response.data.authenticated){
        console.log("Login successful. Calling login function...");
        login(); // login func. passed as a prop
      }
    }catch(err){
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Redirecting to dashboard...");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return(
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;