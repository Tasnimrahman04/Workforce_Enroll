import React from 'react';
import { useNavigate } from 'react-router-dom';

function Company_Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic if needed
    localStorage.removeItem("Users"); // Clear user data from localStorage
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white p-4 flex justify-between items-center border-b-2">
        <h1 className="font-bold text-2xl">Company Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      </div>
       )
    } 
     
      export default Company_Dashboard
