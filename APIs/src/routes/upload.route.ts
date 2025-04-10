import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });


router.post("/uploadFile",authMiddleware, uploadMiddleware.single("file"), uploadFile);
export default router;
