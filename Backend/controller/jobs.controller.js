import Job from "../model/jobs.model.js";

// adding new 
export const addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      workMode,
      jobType,
      jobCategory,
      experienceLevel,
      minSalary,
      maxSalary,
      negotiable,
      responsibilities,
      requirements,
      preferredQualifications,
      benefits,
      company, 
    } = req.body;

    // Checking if the company is provided
    if (!company) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    // Check 
    const existingJob = await Job.findOne({ jobTitle, companyName });
    if (existingJob) {
      return res.status(400).json({ message: "This job already exists" });
    }

    // Creating new job (company)
    const newJob = new Job({
      jobTitle,
      companyName,
      location,
      workMode,
      jobType,
      jobCategory,
      experienceLevel,
      minSalary,
      maxSalary,
      negotiable,
      responsibilities,
      requirements,
      preferredQualifications,
      benefits,
      company, 
    });

    const savedJob = await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: savedJob });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetching all jobs(for Jobseekers)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetching all jobs for the logged-in company
export const getJobsByCompany = async (req, res) => {
  try {
    const { company } = req.query;

    if (!company) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const jobs = await Job.find({ company });

    res.status(200).json(jobs);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//fetching a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit
export const updateJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      workMode,
      jobType,
      jobCategory,
      experienceLevel,
      minSalary,
      maxSalary,
      negotiable,
      responsibilities,
      requirements,
      preferredQualifications,
      benefits,
    } = req.body;

    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const duplicateJob = await Job.findOne({
      _id: { $ne: id },
      jobTitle,
      companyName,
    });

    if (duplicateJob) {
      return res.status(400).json({ message: "This job already exists" });
    }

    job.jobTitle = jobTitle;
    job.companyName = companyName;
    job.location = location;
    job.workMode = workMode;
    job.jobType = jobType;
    job.jobCategory = jobCategory;
    job.experienceLevel = experienceLevel;
    job.minSalary = minSalary;
    job.maxSalary = maxSalary;
    job.negotiable = negotiable;
    job.responsibilities = responsibilities;
    job.requirements = requirements;
    job.preferredQualifications = preferredQualifications;
    job.benefits = benefits;

    const updatedJob = await job.save();
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
