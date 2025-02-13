import express from "express"
import { deleteUser, getUserById, getUsers, patchUser, postUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/getusers", getUsers)
router.get("/getuserbyid/:id", getUserById)
router.post("/postUser", postUser)
router.patch("/patchuser", patchUser)
router.delete("/deleteuser", deleteUser)

export default router