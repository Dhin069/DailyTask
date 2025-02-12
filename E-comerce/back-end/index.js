import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import apiEntryPoint from "./routes/apiEntryPoint.js"

dotenv.config()

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route handler
  };

const app = express()
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiEntryPoint)

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DataBase Connected");
        app.listen(process.env.B_PORT, ()=>{
                console.log(`istening to http://localhost:${process.env.B_PORT}`);
            })
    })
    .catch((err)=>{
        console.error(err);
    })
