import express from 'express';
import { addJob, getAllJobs, getJobsByCompany, getJobById, updateJob, deleteJob } from '../controller/jobs.controller.js';

const router = express.Router();

// adding new 
router.post('/addjobs', addJob);

// geting all jobs
router.get('/all', getAllJobs);

// geting all jobs for a specific company
router.get('/', getJobsByCompany);

// geting a single job by ID
router.get('/:id', getJobById);

//Edit
router.put('/:id', updateJob);

//delete
router.delete('/:id', deleteJob);

export default router;
