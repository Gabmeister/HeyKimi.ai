import React,{useState,useEffect,useCallback} from "react";
import axios from "axios";

const Account = ({ darkMode, setDarkMode, username }) => {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    industry: "",
    subscription_plan: "",
    account_created: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData((prev) =>({ ...prev, [name]: value }));
  };

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user/${username}`);
      setUserData(response.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  }, [username]);

  const handleSaveChanges = async () => {
    try {
      const { full_name, email } = userData; 
      const response = await axios.put(`http://127.0.0.1:8000/user/${username}`, {
        full_name,
        email,
      });
      console.log("User updated:", response.data);
    } catch(err){
      console.error("Failed to update user data:", err);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username,fetchUserData]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#0E0915] text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto py-10 px-6">
        {/*header*/}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <button
            onClick={handleToggle}
            className="px-4 py-2 text-sm font-medium rounded-md border border-purple-500 hover:bg-purple-500 hover:text-white transition duration-300"
          >
            {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </button>
        </div>

        {/*user info*/}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/*full name*/}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={userData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700"
                />
              ) : (
                <p className="text-lg">{userData.full_name}</p>
              )}
            </div>

            {/*email*/}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700"
                />
              ) : (
                <p className="text-lg">{userData.email}</p>
              )}
            </div>

            {/*company name*/}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name
              </label>
              <p className="text-lg">{userData.company_name}</p>
            </div>

            {/*industry*/}
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <p className="text-lg">{userData.industry}</p>
            </div>

            {/*sub plan*/}
            <div>
              <label className="block text-sm font-medium mb-2">
                Subscription Plan
              </label>
              <p className="text-lg">{userData.subscription_plan}</p>
            </div>

            {/*created date*/}
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Created
              </label>
              <p className="text-lg">{userData.account_created}</p>
            </div>
          </div>
        </div>

        {/*action buttons*/}
        <div className="flex justify-end mt-6">
          {isEditing && (
            <button
              onClick={() =>{ //cancel
                setIsEditing(false);
                fetchUserData();
              }}
              className="px-4 py-2 mr-4 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
          >
            {isEditing ? "Save Changes":"Edit Information"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;