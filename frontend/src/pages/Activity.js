import React from "react";

const Activity = ({darkMode}) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"}`}>
      <div className="content-wrapper">
        <h1 className="text-3xl font-bold text-center">activity page XD</h1>
      </div>
    </div>
  );
};

export default Activity;