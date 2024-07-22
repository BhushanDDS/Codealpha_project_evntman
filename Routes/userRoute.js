import { Router } from "express";
import { changePassword, loginUser, logout, registerUser, updateUserInfo } from "../Controllers/userController.js";
import { requireSignIn, isAdmin } from '../middlewares/authMid.js'

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logut').post(logout)
router.route('/updateUser:/id').patch(requireSignIn, updateUserInfo)
router.route('/change-password').patch(requireSignIn, changePassword)



export default router;