import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Button } from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon

function Created_Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const user = JSON.parse(localStorage.getItem('Users'));
      if (user && user.user1) {
        const companyId = user.user1._id;
        try {
          const response = await fetch(`http://localhost:4001/jobs?company=${companyId}`);
          if (response.ok) {
            const data = await response.json();
            setJobs(data);
          } else {
            console.error('Failed to fetch jobs');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteClick = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:4001/jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 dark:text-slate-200 dark:bg-slate-800">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-blue-200 dark:bg-slate-800 p-6 z-10 flex justify-between items-center shadow-md">
        <Link to="/company_dashboard">
          <IconButton size="small" className="hover:bg-gray-100 dark:hover:bg-slate-600">
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <h2 className="text-2xl font-bold">Created Jobs</h2>
        <div></div> {/* Empty div to balance the layout */}
      </div>
      {/* Main Content */}
      <div className="pt-24 p-6"> {/* Add padding-top to account for the fixed navbar */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div key={index} className="bg-yellow-50 p-6 rounded-md shadow-md dark:bg-slate-300 dark:text-black">
              <div className="border-b-2 border-gray-800 dark:border-gray-200 mb-4 pb-2">
                <div className="border-2 border-gray-600 dark:border-gray-400 p-2 rounded-md">
                  <h3 className="text-xl font-semibold mb-2">{job.jobTitle}</h3>
                </div>
              </div>
              <div className="border border-gray-800 dark:border-gray-200 p-4 rounded-md mb-4">
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Work Mode:</strong> {job.workMode}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>Category:</strong> {job.jobCategory}</p>
                <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                <p>
                  <strong>Salary Range:</strong> BDT:{job.minSalary} - {job.maxSalary}{' '}
                  {job.negotiable ? '(Negotiable)' : ''}
                </p>
                <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                <p><strong>Requirements:</strong> {job.requirements}</p>
                <p><strong>Preferred Qualifications:</strong> {job.preferredQualifications}</p>
                <p><strong>Benefits:</strong> {job.benefits}</p>

                <div className="flex justify-end items-center mt-4">
                  <Link to={`/edit-job/${job._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleDeleteClick(job._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <div className="flex justify-end">
                <Link to={`/applications/${job._id}/pending`}>
                  <Button variant="contained" color="primary">
                    Applications
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Created_Jobs;
