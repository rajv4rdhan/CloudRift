import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import {generateRandomCode} from "../../utils/random";
import { ProjectCollection } from "../../models/project.model";
import { pushToBuilder } from "../../utils/redis";
import { s3 } from "../../config/s3";
dotenv.config();


const bucketName = process.env.S3_BUCKET_NAME || "";
const cloudFrontUrl = process.env.CLOUDFRONT_URL || "";

console.log(`Connected to AWS S3 in region: ${process.env.AWS_REGION}`);
console.log(`Using bucket: ${bucketName}`);
console.log(`CloudFront URL: ${cloudFrontUrl}`);

interface UploadRequest extends Request {
    file?: Express.Multer.File;
    body: Record<string, any>;
}


export const uploadFile = async (req: UploadRequest, res: Response): Promise<void> => {
    try {
        console.log("Attempting to upload files to AWS S3...");
        const userId = (req as any).user.id;
        const user = await User.findById(userId);
        const { projectName, domain, projectDescription, tld } = req.body;

        if (!projectName) res.status(400).json({ error: "Project name is required" }); 
        if (!domain) req.body.domain = generateRandomCode(5);
        if (!user){
            res.status(401).json({ error: "Unauthorized" });
            return;
        } 

        const username = user.username;
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) res.status(400).json({ error: "No files uploaded" });

        // Upload each file
        console.log(files);
        for (const file of files) {
            const relativePath = (file as any).originalname; 
            const s3Key = `${req.body.domain}/${relativePath}`;
            const params = {
                Bucket: bucketName,
                Key: s3Key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            await s3.send(new PutObjectCommand(params));
            console.log(`Uploaded: ${s3Key}`);
        }

        const rootUrl = `${cloudFrontUrl}/${req.body.domain}/index.html`;

        const logs = {
            visitors: 0,
            bandwidth_mb: 0,
            impressions: 0,
        };

        const projectData = {
            projectName,
            projectDescription,
            domain: req.body.domain,
            projectUrl: rootUrl,
            logs,
            logs_processed: new Date(),
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

        res.json({ message: "Files uploaded successfully", url: rootUrl });
        return;

    } catch (error) {
        console.error("AWS S3 upload error:", error);
        res.status(500).json({ error: "File upload failed" });
        return;
    }
};


export const uploadZip = async (req: UploadRequest, res: Response): Promise<void> => {
    try {
        console.log("Attempting to upload files to AWS S3...");
        const userId = (req as any).user.id;
        const user = await User.findById(userId);
        console.log(req.body);
        const { projectName, domain, projectType, tld } = req.body;
        if (!projectName) res.status(400).json({ error: "Project name is required" }); 
        if (!domain) req.body.domain = generateRandomCode(5);
        if (!user){
            res.status(401).json({ error: "Unauthorized" });
            return;
        } 
        const username = user.username;
        const file = req.file as Express.Multer.File;
        if (!file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const s3Key = `${req.body.domain}/build/${file.originalname}`;
        const params = {
            Bucket: bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        await s3.send(new PutObjectCommand(params));
        console.log(`Uploaded: ${s3Key}`);

        const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, "");
        pushToBuilder(req.body.domain, fileNameWithoutExtension, username).then(() => {
            console.log("Pushed to builder queue successfully");
        }
        ).catch((err) => {
            console.error("Error pushing to builder queue:", err);
        }
        );

        const rootUrl = `${cloudFrontUrl}/${req.body.domain}/index.html`;

        const logs = {
            visitors: 0,
            bandwidth_mb: 0,
            impressions: 0,
        };

        const projectData = {
            projectName,
            projectType,
            domain: req.body.domain,
            projectUrl: rootUrl,
            logs,
            logs_processed: new Date(),
            projectStatus: "pending",
            tld
        };

        let projectCollection = await ProjectCollection.findOne({ username });
        if (!projectCollection) {
            projectCollection = new ProjectCollection({ username, projects: [projectData] });
        } else {
            projectCollection.projects.push(projectData);
        }

        await projectCollection.save();
        

        res.status(200).json({ message: "Files uploaded successfully", url: rootUrl });
        return;

    } catch (error) {
        console.error("AWS S3 upload error:", error);
        res.status(500).json({ error: "File upload failed" });
        return;
    }
};