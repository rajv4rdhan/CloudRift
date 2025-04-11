import { Router } from "express";
import { uploadFile } from "../controllers/project/upload.controller";
import { getProject } from "../controllers/project/get.controller";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const router = Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post("/uploadFile", authMiddleware, uploadMiddleware.single("file"), uploadFile);
router.get("/getProject", authMiddleware, getProject);

router.post('/update-stats', async (_req, res) => {
    try {
        const command = new InvokeCommand({
            FunctionName: 'getviewandnad',
            Payload: Buffer.from(JSON.stringify({ usernames: ['icdesc', 'alice'] })),
        });

        const response = await lambdaClient.send(command);

        const stats = JSON.parse(new TextDecoder().decode(response.Payload));
        res.json(stats);
    } catch (error) {
        console.error("Error invoking Lambda function:", error);
        res.status(500).json({ error: "Failed to update stats" });
    }
});

export default router;
