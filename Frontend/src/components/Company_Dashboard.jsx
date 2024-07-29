import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Company_Dashboard() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('Users'));
    if (user && user.user1) {
      setCompanyName(user.user1.company_name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Users');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white p-4 flex justify-between items-center border-b-2">
        <h1 className="font-bold text-2xl">Company Dashboard</h1>
        <h1 className="font-bold text-1xl">Welcome {companyName}</h1>
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
                onClick={() => navigate('/addjobs')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
              >
                Add Jobs
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => navigate('/created_jobs')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
              >
                Created Jobs
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

export default Company_Dashboard;
