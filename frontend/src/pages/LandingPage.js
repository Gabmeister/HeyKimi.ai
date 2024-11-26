import React from "react";
import '../pages/LandingPage.css';
import kimilogo from '../components/kimilogo.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img 
        src={kimilogo} 
        alt="Kimi Logo" 
        className="landing-page-logo" 
      />
      <h1>Welcome to HeyKimi.ai</h1>
      <p>Kimi is your new state-of-the-art AI Sales Agent</p>
    </div>
  );
};

export default LandingPage;