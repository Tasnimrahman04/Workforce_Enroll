import React from 'react';
import Home from './home/Home';
import About from './components/About';
import {Route,Routes} from "react-router-dom"
import Contact_us from './components/Contact_us';
import Signup_Jobseeker from './components/Signup_Jobseeker';
import Signup_Company from './components/Signup_Company';
import Login_Company from './components/Login_Company';
import Login_Jobseeker from './components/Login_Jobseeker';
import Login_Admin from './components/Login_Admin';
import Signup_Admin from './components/Signup_Admin';
import Admin_Dashboard from './components/Admin_Dashboard';
import Company_Dashboard from './components/Company_Dashboard';
import Jobseeker_Dashboard from './components/Jobseeker_Dashboard';
import { Toaster } from 'react-hot-toast';



function App() {
   return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact-us" element={<Contact_us/>}/>
        <Route path="/signup_jobseeker" element={<Signup_Jobseeker/>}/>
        <Route path="/signup_company" element={<Signup_Company/>}/>
        <Route path="/login_company" element={<Login_Company/>}/>
        <Route path="/login_jobseeker" element={<Login_Jobseeker/>}/>
        <Route path="/login_admin" element={<Login_Admin/>}/>
        <Route path="/signup_admin" element={<Signup_Admin/>}/>
        <Route path="/admin_dashboard" element={<Admin_Dashboard/>}/>
        <Route path="/company_dashboard" element={<Company_Dashboard/>}/>
        <Route path="/jobseeker_dashboard" element={<Jobseeker_Dashboard/>}/>
                       
      </Routes>
      <Toaster />
    </div>
      

      
    </>
  );
}

export default App;
