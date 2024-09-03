import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin_Dashboard() {
  const [jobseekers, setJobseekers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4001/user/jobseekers')
      .then(response => {
        setJobseekers(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobseekers:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    navigate('/');
  };

  const handleAddAdmin = () => {
    navigate('/signup_admin');
  };

  const handleDetails = (id) => {
    navigate(`/jobseeker/${id}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-gray-100 w-64 flex flex-col">
        <div className="p-4">
          <h1 className="font-bold text-2xl text-white">Admin Panel</h1>
          <ul className="mt-6">
            <li className="cursor-pointer" onClick={handleAddAdmin}>
              <span className="text-gray-300 hover:text-white">Add Admin</span>
            </li>
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

        {/* Jobseeker Table */}
        <div className="overflow-x-auto p-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobseekers.map(jobseeker => (
                <tr key={jobseeker._id}>
                  <td>{jobseeker.fullname}</td>
                  <td>{jobseeker.email}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDetails(jobseeker._id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;
