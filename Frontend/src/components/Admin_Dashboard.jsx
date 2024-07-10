
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin_Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Users"); 
    navigate('/'); 
  };

  const handleAddAdmin = () => {
    navigate('/signup_admin'); 
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-gray-100 w-64 flex flex-col">
        <div className="p-4">
          <h1 className="font-bold text-2xl text-white">Admin Panel</h1>
          <ul className="mt-6">
            {/* Sidebar menu items */}
            <li className="cursor-pointer" onClick={handleAddAdmin}>
              <span className="text-gray-300 hover:text-white">Add Admin</span>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-200 text-black dark:bg-slate-400 p-4 flex justify-between items-center border-b-2">
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Additional content or components */}
      </div>
    </div>
  );
}

export default Admin_Dashboard;
