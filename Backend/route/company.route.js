import express from "express";
import { signup1, login1, getCompanyDetails } from "../controller/company.controller.js";

const router = express.Router();

router.post("/signup_company", signup1);
router.post("/login_company", login1);
router.get("/companies", getCompanyDetails);

export default router;
