import express from 'express';
import {getBook} from "../model/book.model.js";
const router=express.Router();
router.get("/",getBook);
export default router;