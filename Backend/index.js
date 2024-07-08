import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRouter from "../route/book.route.js";
const app = express();
const PORT=process.env.PORT || 4000;
const URI= process.env.MongoBDURI;
dotenv.config();

//connect to mongoDB
try{
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log("Connected to mongoDB");

}catch(error){
    console.log("Error:",error)

}

app.use("/book",bookRouter)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})