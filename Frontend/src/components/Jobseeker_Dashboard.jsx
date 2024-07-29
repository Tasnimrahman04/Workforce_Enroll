import React from 'react'
import { useNavigate } from 'react-router-dom';
function Jobseeker_Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
      // Perform logout logic if needed
      localStorage.removeItem("Users"); // Clear user data from localStorage
      navigate('/'); // Redirect to home page after logout
    };
  
    return (
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-200 text-black p-4 flex justify-between items-center border-b-2">
          <h1 className="font-bold text-2xl">Jobseeker Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-1">
        <nav className="w-64 bg-gray-800 text-white p-4">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => navigate('/all_jobs')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
              >
                Jobs
              </button>
            </li>
            {/* Add more sidebar items here */}
          </ul>
        </nav>
        <div className="flex-1 p-4">
          {/* Main content */}
        </div>
      </div>
    </div>
  );
}

export default Jobseeker_Dashboard
