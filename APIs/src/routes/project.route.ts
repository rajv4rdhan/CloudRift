import { Router } from "express";
import { uploadFile, uploadZip } from "../controllers/project/upload.controller";
import { getProject } from "../controllers/project/get.controller";
import {updateProjectStats, deleteProject} from "../controllers/project/update.controller";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post("/uploadFile", authMiddleware, uploadMiddleware.array("file"), uploadFile);
router.post("/uploadZip", authMiddleware, uploadMiddleware.single("file"), uploadZip);
router.get("/getProject", authMiddleware, getProject);

router.get('/updateStats',authMiddleware, updateProjectStats);
router.delete('/delete', authMiddleware, deleteProject);
export default router;
