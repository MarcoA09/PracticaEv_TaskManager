import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getColabs, createColab } from "../controllers/colaboradores.controller.js";


const router = Router();

router.post('/users-collaborators', createColab)
router.get("/users-collaborators", getColabs);

export default router;