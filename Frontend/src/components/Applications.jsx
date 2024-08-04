import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchApplications = async () => {
      const user = JSON.parse(localStorage.getItem('Users'));

      if (user && user._id) {
        const userId = user._id;
        try {
          const response = await fetch(`http://localhost:4001/applications/${userId}`);

          if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
              setError('No applications found. You haven\'t applied for any jobs yet.');
            } else {
              setApplications(data);
            }
          } else {
            setError('Failed to fetch applications');
          }
        } catch (error) {
          setError('Error fetching applications');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User not found');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDeleteClick = async (applicationId) => {
    const user = JSON.parse(localStorage.getItem('Users'));

    if (user && user._id) {
      const userId = user._id;
      try {
        const response = await fetch(`http://localhost:4001/applications/${applicationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Include userId in the request body
        });
        if (response.ok) {
          setApplications(applications.filter((application) => application._id !== applicationId));
        } else {
          console.error('Failed to delete application');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEditClick = (application) => {
    navigate(`/edit-application/${application._id}`, { state: { application } });
  };

  return (
    <div className="min-h-screen bg-blue-200 dark:text-slate-200 dark:bg-slate-800">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-blue-200 dark:bg-slate-800 p-6 z-10 flex justify-between items-center shadow-md">
        <Link to="/jobseeker_dashboard">
          <IconButton size="small" className="hover:bg-gray-100 dark:hover:bg-slate-600">
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <h2 className="text-2xl font-bold">My Applications</h2>
        <div></div> {/* Empty div to balance the layout */}
      </div>
      {/* Main Content */}
      <div className="pt-24 p-6"> {/* Add padding-top to account for the fixed navbar */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-xl">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <div key={application._id} className="bg-yellow-50 p-6 rounded-md shadow-md dark:bg-slate-300 dark:text-black">
                <h3 className="text-xl font-semibold mb-2">
                  {application.jobId ? (
                    <>
                      Applied for {application.jobId.jobTitle} at {application.jobId.companyName}
                    </>
                  ) : (
                    <span className="text-red-600">This job is not available anymore</span>
                  )}
                </h3>
                <p><strong>Full Name:</strong> {application.fullName}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone Number:</strong> {application.phoneNumber}</p>
                <p><strong>Expected Salary:</strong> BDT {application.expectedSalary}</p>
                <p><strong>Most Recent Job Title:</strong> {application.currentJobTitle}</p>
                <p><strong>Most Recent Job Employer:</strong> {application.currentJobEmployer}</p>
                <p><strong>Cover Letter:</strong> 
                  {application.coverLetter ? (
                    <a href={`http://localhost:4001${application.coverLetter}`} target="_blank" rel="noopener noreferrer">View Cover Letter</a>
                  ) : (
                    'No cover letter provided'
                  )}
                </p>
                <p><strong>CV:</strong> 
                  {application.cv ? (
                    <a href={`http://localhost:4001${application.cv}`} target="_blank" rel="noopener noreferrer">View CV</a>
                  ) : 'No CV provided'}
                </p>
                <p><strong>Status:</strong> 
                  {application.status === 'Accepted' && <span className="text-green-600">Accepted</span>}
                  {application.status === 'Rejected' && <span className="text-red-600">Rejected</span>}
                  {application.status === 'Pending' && <span className="text-yellow-600">Pending</span>}
                </p>
                <div className="flex justify-end items-center mt-4">
                  <IconButton onClick={() => handleEditClick(application)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(application._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;
