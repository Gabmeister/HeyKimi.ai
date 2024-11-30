import React from "react";

const Pipeline = ({darkMode}) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"}`}>
      <div className="content-wrapper">
        <h1 className="text-3xl font-bold text-center">PIPEline page XD</h1>
      </div>
    </div>
  );
};

export default Pipeline;