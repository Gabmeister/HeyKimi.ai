import React from "react";

const Account = ({darkMode, setDarkMode}) => {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#0E0915] text-white":"bg-white text-black"
      }`}
    >
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <button
          onClick={handleToggle}
          className="px-6 py-2 text-lg font-semibold rounded-full border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition duration-300"
        >
          {darkMode ? "Disable Dark Mode":"Enable Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Account;