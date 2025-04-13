import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import {generateRandomCode} from "../../utils/random";
import { ProjectCollection } from "../../models/project.model";
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const bucketName = process.env.S3_BUCKET_NAME || "";
const cloudFrontUrl = process.env.CLOUDFRONT_URL || "";

console.log(`Connected to AWS S3 in region: ${process.env.AWS_REGION}`);
console.log(`Using bucket: ${bucketName}`);
console.log(`CloudFront URL: ${cloudFrontUrl}`);

interface UploadRequest extends Request {
    file?: Express.Multer.File;
    body: Record<string, any>;
}


export const uploadFile = async (req: UploadRequest, res: Response) => {
    try {
        console.log("Attempting to upload file to AWS S3...");
        console.log("req.body", req.body.username);

        const userId = (req as any).user.id;
        const user = await User.findById(userId);
        const { projectName, domain, projectDescription, tld } = req.body;

        if (!projectName) {
            res.status(400).json({ error: "Project name is required" });
            return;
        }
        if (!domain) {
            req.body.domain = generateRandomCode(5);
        }

        if (!user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const username = user.username;
        console.log(username);
        const file = req.file;

        if (!username) {
            res.status(400).json({ error: "Username is required" });
            return;
        }
        if (!file) {
            res.status(400).json({ error: "File is required" });
            return;
        }

        const uniqueFilename = `${file.originalname}`;
        const s3Key = `${req.body.domain}/${uniqueFilename}`;
        
        const params = {
            Bucket: bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));
        console.log(`File uploaded successfully to ${s3Key}`);

        const fileUrl = `${cloudFrontUrl}/${s3Key}`;

        // Save project data to the database
        const logs = {
            visitors: 0,
            bandwidth_mb: 0,
            impressions: 0,
        };
        const logs_processed = new Date();
        const projectData = {
            projectName,
            projectDescription,
            domain: req.body.domain,
            projectUrl: fileUrl,
            logs,
            logs_processed,
            projectStatus: "active",
            tld
            
        };

        let projectCollection = await ProjectCollection.findOne({ username });
        if (!projectCollection) {
            projectCollection = new ProjectCollection({ username, projects: [projectData] });
        } else {
            projectCollection.projects.push(projectData);
        }

        await projectCollection.save();

        res.json({ message: "File uploaded successfully", url: fileUrl });
    } catch (error) {
        console.error("AWS S3 upload error:", error);
        res.status(500).json({ error: "File upload failed" });
    }
};
