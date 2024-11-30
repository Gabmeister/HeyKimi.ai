import React, { useEffect, useState } from "react";
import API from "../services/api";
import LogoTrigger from "../components/LogoTrigger";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Dashboard = ({isAuthenticated, darkMode}) => {
  const [message, setMessage] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);
  const [displayedWords, setDisplayedWords] = useState("");//store realtime words
  const {transcript, resetTranscript} = useSpeechRecognition();//setup speech recog.
  
  useEffect(() => {
    console.log("Dashboard mounted. isAuthenticated:", isAuthenticated);
    if (isAuthenticated){
      if (!SpeechRecognition.browserSupportsSpeechRecognition()){
        console.error("Your browser does not support speech recognition...");
      }else{
        console.log("Authenticated. Starting speech recognition...");
        SpeechRecognition.startListening({continuous: true});//listen upon mount
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {//"hey kimi" logic
    const normalizedTranscript = transcript.toLowerCase();
    if( 
      normalizedTranscript.includes("hey kimi") ||
      normalizedTranscript.includes("hey kimmy") ||
      normalizedTranscript.includes("hey kim") ||   
      normalizedTranscript.includes("hey kimmi")
    ){
      console.log("Detected 'Hey Kimi' trigger");
      handleTrigger();
      setTimeout(() => resetTranscript(), 500); 
      return;
    }
    if(//cutout phrase
      normalizedTranscript.includes("thanks") ||
      normalizedTranscript.includes("thank you") ||
      normalizedTranscript.includes("cheers") ||
      normalizedTranscript.includes("stop")
    ){
      console.log("Stopping printing logic");
      SpeechRecognition.stopListening(); 
      setDisplayedWords(""); 
      setIsPulsing(false);
      resetTranscript(); 
    }else{
      setDisplayedWords((prevWords) => {
        const filteredWords = transcript
          .replace(/hey kimi|hey kimmy|hey kim|hey|hey kimmi/gi, "")
          .trim(); 
        return filteredWords || prevWords; 
      });
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
    SpeechRecognition.startListening({continuous: true});
  };

  const formatDisplayedWords = (words) => {
    if (!words) return [];
    const wordArray = words.split(" ");
    const lines = [];
    for (let i = 0; i < wordArray.length; i += 6) {
      lines.push(wordArray.slice(i, i + 6).join(" "));
    }
    return lines;
  };
  

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0E0915] text-white":"bg-white text-black"}`}>
      {/*page content*/}
      <div className="content-wrapper">
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
        </div>
      </div>
      {/*stickyyy*/}
      <div className="fixed bottom-4 left-40 right-0 flex justify-center z-10">
        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-96 max-w-full border border-gray-300">
          {/*kimilogo*/}
          <div className="flex justify-center items-center flex-shrink-0 w-10 h-10">
            <LogoTrigger onTrigger={handleTrigger} isPulsing={isPulsing} size="small" />
          </div>
          {/* placeholder for now*/}
          <div className="ml-4 text-gray-500 italic flex-grow">hey kimi...</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;