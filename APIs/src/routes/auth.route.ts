import { Router } from "express";
import { signup, login, getDetail } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getDetail", authMiddleware, getDetail);
router.get("/check-username")

export default router;
