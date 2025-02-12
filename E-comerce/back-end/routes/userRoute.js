import express from "express"
import { getUserById, getUsers, patchUser, postUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/getusers", getUsers)
router.get("/getuserbyid/:id", getUserById)
router.post("/postUser", postUser)
router.patch("/patchuser", patchUser)

export default router