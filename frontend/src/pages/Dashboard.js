import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
};

export default Dashboard;