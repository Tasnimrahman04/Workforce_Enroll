import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { toast } from 'react-toastify'; // Add toast notifications


const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('Users'));
    return user ? user._id : null;
};


function All_Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandedJob, setExpandedJob] = useState(null);
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const [userAppliedJobs, setUserAppliedJobs] = useState({});
    const [applicationCounts, setApplicationCounts] = useState({});
    const navigate = useNavigate();
    const userId = getUserId();


    const [acceptedCounts, setAcceptedCounts] = useState({});
    const [rejectedCounts, setRejectedCounts] = useState({});


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`http://localhost:4001/jobs/all?userId=${userId}`);
                const data = await response.json();
                setJobs(data);
                const bookmarked = data.filter(job => job.isBookmarked).map(job => job._id);
                setBookmarkedJobs(bookmarked);


                // Fetch application status and counts
                const appliedJobs = await fetchUserAppliedJobs(data.map(job => job._id));
                setUserAppliedJobs(appliedJobs);
                const counts = await fetchApplicationCounts(data.map(job => job._id));
                setApplicationCounts(counts);




                const acceptedAndRejectedCounts = await fetchAcceptedAndRejectedCounts(data.map(job => job._id));
                setAcceptedCounts(acceptedAndRejectedCounts.accepted);
                setRejectedCounts(acceptedAndRejectedCounts.rejected);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };


        const fetchUserAppliedJobs = async (jobIds) => {
            const appliedJobs = {};
            for (const jobId of jobIds) {
                try {
                    const response = await fetch(`http://localhost:4001/applications/check-application/${userId}/${jobId}`);
                    if (response.ok) {
                        const data = await response.json();
                        appliedJobs[jobId] = data.hasApplied === 'yes';
                    } else {
                        appliedJobs[jobId] = false;
                    }
                } catch (error) {
                    appliedJobs[jobId] = false;
                }
            }
            return appliedJobs;
        };
       


        const fetchAcceptedAndRejectedCounts = async (jobIds) => {
            const counts = {
              accepted: {},
              rejected: {},
            };
         
            for (const jobId of jobIds) {
              try {
                const [acceptedResponse, rejectedResponse] = await Promise.all([
                  fetch(`http://localhost:4001/applications/jobs/${jobId}/accepted-count`),
                  fetch(`http://localhost:4001/applications/jobs/${jobId}/rejected-count`)
                ]);
         
                if (acceptedResponse.ok) {
                  const acceptedData = await acceptedResponse.json();
                  counts.accepted[jobId] = acceptedData.acceptedCount;
                } else {
                  counts.accepted[jobId] = 0;
                }
         
                if (rejectedResponse.ok) {
                  const rejectedData = await rejectedResponse.json();
                  counts.rejected[jobId] = rejectedData.rejectedCount;
                } else {
                  counts.rejected[jobId] = 0;
                }
              } catch (error) {
                counts.accepted[jobId] = 0;
                counts.rejected[jobId] = 0;
              }
            }
         
            return counts;
          };
        const fetchApplicationCounts = async (jobIds) => {
            const counts = {};
            for (const jobId of jobIds) {
                try {
                    const response = await fetch(`http://localhost:4001/applications/job/${jobId}/counts`);
                    if (response.ok) {
                        const data = await response.json();
                        counts[jobId] = data.totalCount;
                    } else {
                        counts[jobId] = 0;
                    }
                } catch (error) {
                    counts[jobId] = 0;
                }
            }
            return counts;
        };




        fetchJobs();
    }, [userId]);


    const handleToggle = (index) => {
        setExpandedJob(expandedJob === index ? null : index);
    };


    const handleApply = (job) => {
        if (userAppliedJobs[job._id]) {
            toast.info('You have already applied for this job');
        } else {
            navigate(`/apply/${job._id}`, { state: { job } });
        }
    };


    {/*const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A";
        }
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };*/}
    const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A";
        }
    
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        
        // Reset hours for today and tomorrow
        today.setHours(0, 0, 0, 0);
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
    
        console.log(`Date: ${date.toISOString().split('T')[0]}, Today: ${today.toISOString().split('T')[0]}, Tomorrow: ${tomorrow.toISOString().split('T')[0]}`); // Debugging line
    
        if (date.toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
            return "Today is the deadline";
        }
    
        if (date.toISOString().split('T')[0] === tomorrow.toISOString().split('T')[0]) {
            return "Tomorrow is the deadline";
        }
    
        return date.toISOString().split('T')[0];
    };
  
    const handleBookmarkToggle = async (jobId) => {
        try {
            const response = await fetch('http://localhost:4001/jobs/bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, jobId }),
            });


            if (response.ok) {
                setJobs((prevJobs) => {
                    return prevJobs.map((job) => {
                        if (job._id === jobId) {
                            return { ...job, isBookmarked: !job.isBookmarked };
                        }
                        return job;
                    });
                });


                setBookmarkedJobs((prevBookmarkedJobs) => {
                    if (prevBookmarkedJobs.includes(jobId)) {
                        return prevBookmarkedJobs.filter(id => id !== jobId);
                    } else {
                        return [...prevBookmarkedJobs, jobId];
                    }
                });
            } else {
                console.error('Failed to toggle bookmark');
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-400  text-slate-900 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-600 dark:text-slate-200">
            <div className="fixed top-0 left-0 right-0 bg-blue-300 dark:bg-slate-800 p-6 z-10 flex justify-between items-center shadow-md border-2 border-blue-400 dark:border-slate-500">
                <h2 className="text-3xl font-bold hover:bg-blue-400 dark:hover:bg-slate-900 dark:text-gray-200">All Available Jobs</h2>
                <button
                    className='text-2xl hover:text-black dark:hover:text-gray-400'
                    onClick={() => navigate('/jobseeker_dashboard')}
                >
                    ✕
                </button>
            </div>
            <div className="pt-24 p-6 border-4 border-blue-600 dark:border-slate-500">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className={`relative rounded-md border-2 border-pink-300 dark:border-slate-200 shadow-xl cursor-pointer transition-all duration-300 ease-in-out overflow-hidden mt-2 ${
                                expandedJob === index
                                    ? 'bg-gradient-to-r from-pink-300 to-purple-100 hover:from-pink-400 hover:to-orange-200 p-6 dark:bg-gradient-to-r dark:from-gray-400 dark:to-slate-600 dark:text-black h-auto'
                                    : 'bg-gradient-to-r from-pink-300 to-purple-50 hover:from-pink-400 hover:to-orange-200 p-3 dark:bg-gradient-to-r dark:from-gray-600 dark:to-slate-500 dark:hover:from-gray-700 dark:hover:to-slate-700 dark:text-gray-300 h-36'
                            }`}
                            onClick={() => handleToggle(index)}
                        >
                            <div className={`flex justify-between items-start ${expandedJob === index ? 'mb-4' : 'mb-2'}`}>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-black bg-pink-100 dark:bg-slate-800 dark:text-slate-200 mb-2 border-2 border-gray-500 dark:border-gray-400 p-1 rounded-md">{job.jobTitle}</h3>
                                    <p><strong>Company:</strong> {job.companyName}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary Range:</strong> BDT:{job.minSalary} - {job.maxSalary} {job.negotiable ? "(Negotiable)" : ""}</p>
                                </div>
                                <button
                                    className="absolute top-0 right-1 p-6"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBookmarkToggle(job._id);
                                    }}
                                >
                                    {bookmarkedJobs.includes(job._id) ? (
                                        <BookmarkIcon className="text-slate-800" fontSize="large" />
                                    ) : (
                                        <BookmarkBorderIcon className="text-slate-200" fontSize="large" />
                                    )}
                                </button>
                                {expandedJob !== index && (
                                    <button
                                        className={`dark:bg-blue-900 bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md  transition duration-200 mt-14 ${userAppliedJobs[job._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApply(job);
                                        }}
                                        disabled={userAppliedJobs[job._id]}
                                    >
                                        {userAppliedJobs[job._id] ? 'Applied' : 'Apply'}
                                    </button>
                                )}
                            </div>
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
                                    <p><strong>Posted:</strong> {formatDate(job.createdAt)}</p>
                                    <p><strong>Deadline:</strong> {formatDate(job.deadline)}</p>
                                    <p><strong>Total Applications:</strong> {applicationCounts[job._id] || 0}</p>
                                    <p><strong>Accepted Applications:</strong> {acceptedCounts[job._id] || 0}</p>
                                    <p><strong>Rejected Applications:</strong> {rejectedCounts[job._id] || 0}</p>
                                    <button
                                        className={`dark:bg-blue-900 bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md  transition duration-200 mt-4 block mx-auto ${userAppliedJobs[job._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApply(job);
                                        }}
                                        disabled={userAppliedJobs[job._id]}
                                    >
                                        {userAppliedJobs[job._id] ? 'Applied' : 'Apply'}
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


