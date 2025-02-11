import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Product } from "./model/ProductModel.js"

dotenv.config()

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route handler
  };

const app = express()
app.use(logger)

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

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({},{_id:0});
        res.status(200).json(products); 
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message }); 
    }
    });

