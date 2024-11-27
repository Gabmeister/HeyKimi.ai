import React, { useEffect, useState } from "react";
import API from "../services/api";
import LogoTrigger from "../components/LogoTrigger";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    API.get("/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  }, []);

  // handle circle trigger
  const handleTrigger = () => {
    console.log("Logo clicked or NLP trigger activated!");
    setIsPulsing(true);
    setTimeout(() => {//stop pulsing after 3 secs
      setIsPulsing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {}
      <LogoTrigger onTrigger={handleTrigger} isPulsing={isPulsing}/>

      {/* page content */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
      </div>
    </div>
  );
};

export default Dashboard;