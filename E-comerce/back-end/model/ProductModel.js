import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock_quantity: Number,
  description: String,
});

export const Product = mongoose.model("Products", productSchema);
