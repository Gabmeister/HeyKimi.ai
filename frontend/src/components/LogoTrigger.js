import React from "react";
import logo from "../assets/kimicircle.png";

const LogoTrigger=({onTrigger,isPulsing})=>{
  return (
    <div className="flex justify-center items-center mt-4">
      <img
        src={logo}
        alt="Kimi Logo"
        className={`w-20 h-20 cursor-pointer ${isPulsing ? "animate-pulse" : ""}`}
        onClick={onTrigger}
      />
    </div>
  );
};

export default LogoTrigger;