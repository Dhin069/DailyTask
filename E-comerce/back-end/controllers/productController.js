import { Product } from "../model/ProductModel.js"
import { ObjectId } from "mongodb";

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({},{_id:0});
        return res.status(200).json(products); 
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: error.message }); 
    }
}

const getProductById = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id,{_id:0});
        return res.status(200).json(product)
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: error.message }); 
    }
}

// "name": "Wooden Dining Table",
//         "category": "Furniture",
//         "price": 249.99,
//         "stock_quantity": 15,
//         "description": "A premium solid wood dining table with a modern finish, perfect for family meals."

const postProduct = async(req, res)=>{
    try {
        const {name, category, price, stock_quantity, description} = req.body
        const product = await Product.insertOne({name, category, price, stock_quantity, description})
        return res.status(200).send(product);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: error.message }); 
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.body
    const product = await Product.deleteOne({_id:id})
    
    if (product.deletedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
    }
    
    return res.status(200).json({ message: "Product deleted successfully." });}
    catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: error.message }); 
    }
}

const patchPrduct = async(req, res)=>{
   try {
    const {id, ...updateFields} = req.body
    const product = await Product.updateOne({_id:id},{$set:updateFields})

    if (product.matchedCount == 0){
        return res.status(404).json({"msg":"No user found"})
    }

    if (product.modifiedCount == 0){
        return res.status(204).json({"msg":"No updates made"})
    }

    return res.status(200).json({"msg":"Updated successfully"})
   } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: error.message }); 
   }


}
export {getAllProducts, getProductById, postProduct, patchPrduct, deleteProduct};