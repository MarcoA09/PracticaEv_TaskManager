import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getTasks, createTask, getTasksGroups, updateTask } from "../controllers/tasks.controller.js";


const router = Router();

router.get('/dashboard', authRequired)
router.post('/task', authRequired, createTask)
router.get("/dashboard", authRequired, getTasks);
router.get("/groups/tasks/:idGroup", authRequired, getTasksGroups);
router.put("/task/:id", authRequired, updateTask);


export default router;