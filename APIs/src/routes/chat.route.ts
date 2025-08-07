import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {getChatHistory, chat} from "../controllers/chat/chat.controller";
import {getChatSession, getSingleChat, createChatSession} from "../controllers/chat/session.controller";

const router = Router();

router.post("/chat/session",authMiddleware, createChatSession);
router.get("/chat/session",authMiddleware, getChatSession);
router.get("/chat/history/:id",authMiddleware, getChatHistory);
router.post("/chat/:id",authMiddleware, chat);
router.get("/chat/session/:id",authMiddleware, getSingleChat);


export default router;
