import React, {useState} from "react";

const Account = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <button
          onClick={handleToggle}
          className="px-6 py-2 text-lg font-semibold rounded-full border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition duration-300"
        >
          {isDarkMode ? "Disable Dark Mode":"Enable Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Account;