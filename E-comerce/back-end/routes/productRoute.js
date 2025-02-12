import express from "express"
import { deleteProduct, getAllProducts,  getProductById, postProduct, patchPrduct} from "../controllers/productController.js";

const router = express.Router();

router.get("/allproducts", getAllProducts)
router.get("/productbyid/:id", getProductById)
router.post("/postproduct", postProduct)
router.patch("/patchproduct", patchPrduct)
router.delete("/deleteproduct", deleteProduct)

export default router;