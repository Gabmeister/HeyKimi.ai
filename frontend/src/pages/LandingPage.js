import React from "react";
import kimicircle from '../assets/kimicircle.png';

const LandingPage = () => {
  return (
    <div style={{ marginLeft: "9rem" }} className="px-6 flex items-center justify-between h-40">
      {/*heading + subtext*/}
      <div>
        <h1 className="text-8xl font-bold mb-2"
        style={{marginLeft: "20rem", marginTop: "20rem"}}
        ><span style={{ color: "#5539CC" }}>AI</span> Powered Sales, <span style={{ color: "#5539CC" }}> Human </span>Results.</h1>
        <p className="text-gray-700 italic"
        style={{marginLeft: "20rem", marginRight: "10rem"}}
        >Kimi harnesses the power of a multi-agent AI sales team to serve your company
        the hottest leads on a silver platter, including personalized and enriched
        outreach.
        </p>
      </div>

      {/*kimi circle logo*/}
      <div>
        <img
          src={kimicircle}
          alt="Kimi circle"
          className="w-96 h-96 rounded-full animate-slowpulse"
          style={{ marginRight: "35rem", marginTop: "20rem"}}
        />
      </div>
    </div>
  );
};


export default LandingPage;