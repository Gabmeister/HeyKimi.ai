import React, { useEffect, useState } from "react";
import API from "../services/api";
import LogoTrigger from "../components/LogoTrigger";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Dashboard = ({isAuthenticated, darkMode}) => {
  const [message, setMessage] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);
  const [displayedWords, setDisplayedWords] = useState("");//store realtime words
  const {transcript, resetTranscript} = useSpeechRecognition();//setup speech recog.
  const [isListening, setIsListening] = useState(false);
  const [todaysAccounts, setTodaysAccounts] = useState([]);
  
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
  },[isAuthenticated]);

  useEffect(() => {
    API.get("/todays_accounts")
      .then((response) => setTodaysAccounts(response.data.accounts))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {//"hey kimi" logic
    const normalizedTranscript = transcript.toLowerCase();
    if( 
      normalizedTranscript.includes("hey kimi") ||
      normalizedTranscript.includes("hey kimmy") ||
      normalizedTranscript.includes("hey kim") ||   
      normalizedTranscript.includes("hey kimmi")
    ){
      console.log("Detected 'Hey Kimi' trigger");
      setIsListening(true);
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
      setIsListening(false);
      setIsPulsing(false);
      resetTranscript(); 
      return;
    }
    if (isListening){
      setDisplayedWords((prevWords) => {
        const filteredWords = transcript
          .replace(/hey kimi|hey kimmy|hey kim|hey|hey kimmi/gi,"")
          .trim();
        return filteredWords || prevWords;
      });
    }

  }, [transcript, resetTranscript, isListening]);

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

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"
      }`}
    >
      {/*page content*/}
      <div className="flex-grow content-wrapper"
        style={{ marginLeft: "9rem" }}>
        {/*today's accounts container*/}
        <div className="flex justify-start space-x-4 mt-8 px-6">
          {/*card layout container*/}
          <div className="flex-shrink-0 h-[50vh] w-[25%] bg-[#1B152A] rounded-md shadow-md p-4 overflow-hidden">
            <h2 className="text-lg font-bold text-white mb-4">Today's Accounts</h2>
            <div className="overflow-y-auto h-full  scrollbar scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 space-y-4">
              {todaysAccounts.map((account, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#261C34] rounded-lg shadow hover:bg-[#342544] transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        {account.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{account.industry}</p>
                      <p className="text-gray-400 text-sm">{account.location}</p>
                      <p className="text-gray-400 text-sm">
                        Employees: {account.employees}
                      </p>
                      <a
                        href={account.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline text-sm"
                      >
                        Visit Website
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-500 hover:text-green-700">
                        ✔
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        ✖
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/*others*/}
          <div className="flex-grow text-center">
            <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
          </div>
        </div>
      </div>
  
      {/*stickyyyy*/}
      <div className="fixed bottom-4 left-40 right-0 flex justify-center z-10">
        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-96 max-w-full border border-gray-300">
          {/*kimi logo*/}
          <div className="flex justify-center items-center flex-shrink-0 w-10 h-10">
            <LogoTrigger
              onTrigger={handleTrigger}
              isPulsing={isPulsing}
              size="small"
            />
          </div>
          {/*realtime word display*/}
          <div className="ml-4 text-gray-500 italic flex-grow">
            {displayedWords || "hey kimi..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;