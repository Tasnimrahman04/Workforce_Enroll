import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './components/About';
import ContactUs from './components/Contact_us';
import SignupJobseeker from './components/Signup_Jobseeker';
import SignupCompany from './components/Signup_Company';
import LoginCompany from './components/Login_Company';
import LoginJobseeker from './components/Login_Jobseeker';
import LoginAdmin from './components/Login_Admin';
import SignupAdmin from './components/Signup_Admin';
import AdminDashboard from './components/Admin_Dashboard';
import CompanyDashboard from './components/Company_Dashboard';
import JobseekerDashboard from './components/Jobseeker_Dashboard';
import AddJobs from './components/Add_Jobs';
import CreatedJobs from './components/Created_Jobs';
import AllJobs from './components/All_Jobs';
import EditJob from './components/EditJob';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/signup_jobseeker" element={<SignupJobseeker />} />
          <Route path="/signup_company" element={<SignupCompany />} />
          <Route path="/login_company" element={<LoginCompany />} />
          <Route path="/login_jobseeker" element={<LoginJobseeker />} />
          <Route path="/login_admin" element={<LoginAdmin />} />
          <Route path="/signup_admin" element={<SignupAdmin />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/company_dashboard" element={<CompanyDashboard />} />
          <Route path="/jobseeker_dashboard" element={<JobseekerDashboard />} />
          <Route path="/addjobs" element={<AddJobs />} />
          <Route path="/created_jobs" element={<CreatedJobs />} />
          <Route path="/all_jobs" element={<AllJobs />} />
          <Route path="/edit-job/:jobId" element={<EditJob />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
