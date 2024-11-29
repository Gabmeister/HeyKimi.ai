import React from "react";
import logo from "../assets/kimicircle.png";

const LogoTrigger=({onTrigger,isPulsing,size = "default"})=>{
  const sizes = {
    small: "w-10 h-10", 
    default: "w-20 h-20", 
  };
  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${sizes[size]} ${
        isPulsing ? "animate-pulse" : ""
      }`}
      onClick={onTrigger}
    >
      <img src={logo} alt="Kimi Logo" className="rounded-full" />
    </div>
  );
};

export default LogoTrigger;