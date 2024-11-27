import React, { useEffect, useState } from "react";
import API from "../services/api";
import LogoTrigger from "../components/LogoTrigger";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);
  const {transcript, resetTranscript} = useSpeechRecognition();//setup speech recog.
  
  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()){
      console.error("Your browser does not support speech recognition.");
    }else {
      SpeechRecognition.startListening({ continuous: true });//listen upon mount
    }
  }, []);

  useEffect(() => {
    const normalizedTranscript = transcript.toLowerCase();
    if ( 
      normalizedTranscript.includes("hey kimi") ||
      normalizedTranscript.includes("hey kimmy") ||
      normalizedTranscript.includes("hey kim") ||   
      normalizedTranscript.includes("hey kimmi")
    ) {
      handleTrigger();
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  useEffect(() => {
    API.get("/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  }, []);

  // handle circle trigger
  const handleTrigger = () => {
    console.log("trigger activated");
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