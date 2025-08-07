import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {getChatHistory, chat} from "../controllers/chat/chat.controller";
import {getChatSession, getSingleChat, createChatSession} from "../controllers/chat/session.controller";

const router = Router();


router.get("/chat/history/:id",authMiddleware, getChatHistory);
router.post("/chat",authMiddleware, chat);
router.get("/chat/session",authMiddleware, getChatSession);
router.get("/chat/session/:id",authMiddleware, getSingleChat);
router.post("/chat/session",authMiddleware, createChatSession);

export default router;
