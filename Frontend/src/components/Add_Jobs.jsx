import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';

function Add_Jobs() {
    const [page, setPage] = useState(1);
    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
    const navigate = useNavigate();

    const handleSubmitForm = async (data) => {
        const user = JSON.parse(localStorage.getItem('Users'));
        const companyId = user && user.user1 ? user.user1._id : null;
    
        if (!companyId) {
            toast.error('Company ID is missing');
            return;
        }
    
        const jobData = { ...data, company: companyId };
    
        try {
            const response = await fetch('http://localhost:4001/jobs/addjobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
    
            if (response.ok) {
                const result = await response.json();
                toast.success('Job added successfully!');
                console.log(result);
                navigate('/company_dashboard');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to add job');
            }
        } catch (error) {
            toast.error('Failed to add job');
            console.error('Error:', error);
        }
    };
    

    const handleNext = async () => {
        const isValid = await trigger(); 
        if (isValid) {
            setPage(page + 1); 
        }
    };

    const handleBack = () => {
        setPage(page - 1); 
    };

    return  (
        <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-slate-600">
            <div className="relative w-[600px] bg-white p-6 rounded-md shadow-md dark:bg-slate-900 dark:text-white">
                <p className="absolute right-2 top-2">
                    <Link to="/company_dashboard" className='btn btn-sm btn-circle btn-ghost hover:bg-gray-200 dark:hover:bg-slate-600'>
                        ✕
                    </Link>
                </p>
                
                
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                
                    <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 border-gray-300 dark:border-slate-700">Add Job</h2>
                    
                    {page === 1 && (
                        
                        <div className="border-2 p-4 rounded-md border-gray-300 dark:border-slate-700">
                            
                            <h3 className="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-300 dark:border-slate-700">Basic Information</h3>
                            <div className="mb-3">
                                <label className="block mb-1">Job Title:</label>
                                <input
                                    type="text"
                                    placeholder='Enter title'
                                    {...register("jobTitle", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                                />
                                {errors.jobTitle && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Company Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Company-Name'
                                    {...register("companyName", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                                />
                                {errors.companyName && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Location:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Location'
                                    {...register("location", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                                />
                                {errors.location && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Work Mode:</label>
                                <select
                                    {...register("workMode")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-slate-500"
                                >
                                    <option value="on-site">On-site</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-900"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {page === 2 && (
                        <div className="border-2 p-4 rounded-md border-gray-300 dark:border-slate-700">
                            <h3 className="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-300 dark:border-slate-700">Job Details</h3>
                            <div className="mb-3">
                                <label className="block mb-1">Job Type:</label>
                                <select
                                    {...register("jobType", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-slate-500"
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                                {errors.jobType && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Job Category:</label>
                                <select
                                    {...register("jobCategory", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-slate-500"
                                >
                                    <option value="it">IT</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="sales">Sales</option>
                                    <option value="finance">Finance</option>
                                    <option value="hr">HR</option>
                                </select>
                                {errors.jobCategory && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Experience Level:</label>
                                <select
                                    {...register("experienceLevel", { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-slate-500"
                                >
                                    <option value="entry-level">Entry-level</option>
                                    <option value="mid-level">Mid-level</option>
                                    <option value="senior-level">Senior-level</option>
                                    <option value="manager">Manager</option>
                                    <option value="director">Director</option>
                                </select>
                                {errors.experienceLevel && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1">Salary Range:</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        {...register("minSalary", { min: 1000, max: 100000, step: 1000 })}
                                        defaultValue={1000}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        {...register("maxSalary", { min: 1000, max: 100000, step: 1000 })}
                                        defaultValue={2000}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                                    />
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        {...register("negotiable")}
                                    />
                                    <span className="ml-2">Negotiable</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-900"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {page === 3 && (
                        <div className="border-2 p-2 rounded-md border-gray-300 dark:border-slate-700">
                            <h3 className="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-300 dark:border-slate-700">Job Description</h3>
                            <div className="mb-2">
                                <label className="block mb-1">Responsibilities:</label>
                                <textarea
                                    {...register("responsibilities", { required: true })}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md dark:text-black"
                                    placeholder='Enter Responsibilities'
                                />
                                {errors.responsibilities && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Requirements:</label>
                                <textarea
                                    {...register("requirements", { required: true })}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md dark:text-black"
                                    placeholder='Enter Requirements'
                                />
                                {errors.requirements && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Preferred Qualifications:</label>
                                <textarea
                                    {...register("preferredQualifications")}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md dark:text-black"
                                    placeholder='Enter Preferred Qualifications'
                                />
                            </div>
                            <div className="mb-3 border-2 p-2 rounded-md border-gray-300 dark:border-slate-700">
                                <h3 className="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-300 dark:border-slate-700">Benefits</h3>
                                <div className="mb-2">
                                    <label className="block mb-1">Benefits:</label>
                                    <textarea
                                        {...register("benefits")}
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md dark:text-black"
                                        placeholder='Enter Benefits'
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-900"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Add_Jobs;
