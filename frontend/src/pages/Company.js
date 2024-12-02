import React from "react";

const Company = ({darkMode}) => {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"}`}>
        <div className="content-wrapper">
          <h1 className="text-3xl font-bold text-center">company page XD</h1>
        </div>
      </div>
    );
  };
  
  export default Company;