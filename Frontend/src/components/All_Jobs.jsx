import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

function All_Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandedJob, setExpandedJob] = useState(null);

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
        // Expanding part:Expand the clicked job or collapse if already expanded
        setExpandedJob(expandedJob === index ? null : index);
    };

    return (
        <div className="p-6 bg-blue-200 min-h-screen dark:bg-slate-900 dark:text-slate-200">
            <p><Link to="/jobseeker_dashboard" className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-gray-100 dark:hover:bg-slate-600'>✕</Link></p>
            <h2 className="text-2xl font-bold mb-6">All Available Jobs</h2>
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
                                        alert('Apply for this job!'); 
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
                                        alert('Apply for this job!'); 
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
    );
}

export default All_Jobs;
