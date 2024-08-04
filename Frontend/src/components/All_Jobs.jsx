import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function All_Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandedJob, setExpandedJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:4001/jobs/all');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleToggle = (index) => {
        setExpandedJob(expandedJob === index ? null : index);
    };

    const handleApply = (job) => {
        console.log('Navigating with job:', job); // Debugging statement
        navigate(`/apply/${job._id}`, { state: { job } });
    };

    return (
        <div className="min-h-screen bg-blue-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 bg-blue-200 dark:bg-slate-800 p-6 z-10 flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Available Jobs</h2>
                <Link to="/jobseeker_dashboard" className='text-2xl hover:text-gray-500 dark:hover:text-gray-400'>
                    ✕
                </Link>
            </div>
            {/* Main Content */}
            <div className="pt-24 p-6"> {/* Add padding-top to account for the fixed navbar */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className={`relative rounded-md shadow-md cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
                                expandedJob === index
                                    ? 'bg-pink-50 p-6 dark:bg-slate-700 h-auto'
                                    : 'bg-pink-50 p-4 dark:bg-slate-700 h-36'
                            }`}
                            onClick={() => handleToggle(index)}
                        >
                            <div className={`flex justify-between items-center ${expandedJob === index ? 'mb-4' : 'mb-2'}`}>
                                <h3 className="text-xl font-semibold text-black dark:text-white">{job.jobTitle}</h3>
                                {expandedJob !== index && (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApply(job);
                                        }}
                                    >
                                        Apply
                                    </button>
                                )}
                            </div>
                            <p><strong>Company:</strong> {job.companyName}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary Range:</strong> BDT:{job.minSalary} - {job.maxSalary} {job.negotiable ? "(Negotiable)" : ""}</p>

                            {expandedJob === index && (
                                <div className="mt-4">
                                    <p><strong>Work Mode:</strong> {job.workMode}</p>
                                    <p><strong>Job Type:</strong> {job.jobType}</p>
                                    <p><strong>Category:</strong> {job.jobCategory}</p>
                                    <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                                    <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                                    <p><strong>Requirements:</strong> {job.requirements}</p>
                                    <p><strong>Preferred Qualifications:</strong> {job.preferredQualifications}</p>
                                    <p><strong>Benefits:</strong> {job.benefits}</p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4 block mx-auto"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApply(job);
                                        }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default All_Jobs;
