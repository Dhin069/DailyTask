import express from "express"
import productRoute from "./productRoute.js"
import userRoute from "./userRoute.js"
const router = express.Router()

router.use("/products", productRoute)
router.use("/users", userRoute)

export default router;