import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin_Dashboard() {
  const [jobseekers, setJobseekers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [view, setView] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4001/user/jobseekers')
      .then(response => setJobseekers(response.data))
      .catch(error => console.error('Error fetching jobseekers:', error));
    
    axios.get('http://localhost:4001/user1/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleDetails = (id, type) => {
    if (type === 'jobseeker') {
      navigate(`/jobseeker/${id}`);
    } else {
      navigate(`/company/${id}`);
    }
  };

  const handleMoreInfo = (id) => {
    navigate(`/company-info/${id}`);
  };

  const handleAddAdmin = () => {
    navigate('/signup_admin');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-gray-100 w-64 flex flex-col justify-between">
        <div className="p-4">
          <h1 className="font-bold text-2xl text-white">Admin Panel</h1>
          <ul className="mt-6">
            <li
              className={`cursor-pointer ${view === 'user' ? 'text-white' : 'text-gray-300'}`}
              onClick={() => setView('user')}
            >
              User Information
            </li>
            <li
              className={`cursor-pointer ${view === 'company' ? 'text-white' : 'text-gray-300'}`}
              onClick={() => setView('company')}
            >
              Company Information
            </li>
          </ul>
        </div>

        <div className="p-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
            onClick={handleAddAdmin}
          >
            Add Admin
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-200 text-black dark:bg-slate-400 p-4 flex justify-between items-center border-b-2">
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-4">
          {view === 'user' && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => handleDetails(jobseeker._id, 'jobseeker')}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {view === 'company' && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Actions</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(company => (
                  <tr key={company._id}>
                    <td>{company.company_name}</td>
                    <td>{company.company_email}</td>
                    <td>{company.company_address}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => handleDetails(company._id, 'company')}
                      >
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                        onClick={() => handleMoreInfo(company._id)}
                      >
                        More Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;
