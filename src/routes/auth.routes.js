import { Router } from "express";
import {login, register, getUsers, verifyToken, logout, verifyEmail} from '../controllers/auth.controller.js';
import {authRequired} from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);
router.get("/users", authRequired, getUsers);
router.post("/logout", verifyToken, logout);
router.post("/verifyEmail", verifyEmail);

export default router;