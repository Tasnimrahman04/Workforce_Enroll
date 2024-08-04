import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:4001/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          setError('Failed to fetch job details');
        }
      } catch (error) {
        setError('Error fetching job details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return (
    <div className="flex justify-center items-center h-40">
      <span className="text-xl">Loading...</span>
    </div>
  );

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-blue-200 min-h-screen dark:text-slate-200 dark:bg-slate-800 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-yellow-50 p-4 rounded-md shadow-md dark:bg-slate-300 dark:text-black">
        <p className="absolute top-2 right-2">
          <Link to="/created_jobs" className='btn btn-sm btn-circle btn-ghost hover:bg-gray-100 dark:hover:bg-slate-600'>
            <ArrowBackIcon />
          </Link>
        </p>
        {job ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{job.jobTitle}</h2>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Work Mode:</strong> {job.workMode}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Category:</strong> {job.jobCategory}</p>
            <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
            <p>
              <strong>Salary Range:</strong> BDT {job.minSalary} - {job.maxSalary} 
              {job.negotiable ? ' (Negotiable)' : ''}
            </p>
            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Preferred Qualifications:</strong> {job.preferredQualifications}</p>
            <p><strong>Benefits:</strong> {job.benefits}</p>

            <div className="flex justify-end mt-4">
            <Link to={`/applications/${job._id}/pending`}>
                <Button variant="contained" color="primary">
                  View Applications
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <p>Job not found.</p>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
