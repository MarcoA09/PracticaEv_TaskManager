import { Router } from "express";
import { authRequired  } from "../middlewares/validateToken.js";
import { createGroup, getGroups, getIntegrantsGroup } from "../controllers/group.controller.js";

const router = Router();

router.post("/groups", authRequired, createGroup)
router.get("/groups", authRequired, getGroups)
router.get("/groups/integrants/:idGroup", getIntegrantsGroup);

export default router;