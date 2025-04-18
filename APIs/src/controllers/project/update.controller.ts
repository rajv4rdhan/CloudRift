import { ProjectCollection } from "../../models/project.model";
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import dotenv from "dotenv";
dotenv.config();
import { S3Client, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import axios from "axios";
export const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
const bucketName = process.env.S3_BUCKET_NAME || "";
const lambdaClient = new LambdaClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});


const getStats = async (project: string[], last_processed: Date) => {
    try {
        last_processed.setDate(last_processed.getDate() - 1);
        const command = new InvokeCommand({
            FunctionName: "hostrift-aws-lambda",
            Payload: Buffer.from(JSON.stringify({
                usernames: project,
                last_processed: last_processed.toISOString()
            })),
        });

        const response = await lambdaClient.send(command);
        
        const stats = JSON.parse(new TextDecoder().decode(response.Payload));
        console.log("Lambda response:", stats);
        return stats;
    } catch (error) {
        console.error("Error invoking Lambda function:", error);
        return { error: "Failed to update stats" };
    }
};


export const updateProjectStats = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const username = user.username
        console.log("Username:", username);
        const projectCollection = await ProjectCollection.findOne({ username: username });

        if (!projectCollection) {
            res.status(404).json({ error: "Project collection not found" });
            return;
        }
        const domainarr = projectCollection.projects.map((project) => project.domain);

        const stats = await getStats(domainarr, projectCollection.logs_processed);

        for (const domain of domainarr) {
            const domainStats = stats[domain];
            if (domainStats) {
            const project = projectCollection.projects.find((p) => p.domain === domain);
            if (project) {
                project.projectStatus = await checkUrlStatus(project.projectUrl);
                project.logs.visitors += domainStats.visitors || 0;
                project.logs.bandwidth_mb += domainStats.bandwidth_mb || 0;
                project.logs.impressions += domainStats.impressions || 0;
            }
            }
        }
        
        projectCollection.logs_processed = new Date(stats.last_processed);

        await projectCollection.save();

        res.status(200).json({ message: "Project stats updated successfully" });
    } catch (error) {
        console.error("Error updating project stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      
      const [user, projectCollection] = await Promise.all([
        User.findById(userId),
        User.findById(userId).then(u => 
          u ? ProjectCollection.findOne({ username: u.username }) : null
        )
      ]);
  
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      
      if (!projectCollection) {
        res.status(404).json({ error: "Project collection not found" });
        return;
      }
  
      const { domain } = req.body;
      if (!domain) {
        res.status(400).json({ error: "Domain is required" });
        return;
      }
  
      const projectIndex = projectCollection.projects.findIndex(
        (project) => project.domain === domain
      );
      
      if (projectIndex === -1) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const folderKey = `${domain}/`;
      const [s3Result] = await Promise.all([
        deleteS3Folder(folderKey),
        updateProjectCollection(projectCollection, projectIndex)
      ]);
  
      if (s3Result.error) {
        res.status(500).json({ error: s3Result.error });
        return;
      }
  
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  async function deleteS3Folder(folderKey: string) {
    try {
      const listParams = {
        Bucket: bucketName,
        Prefix: folderKey,
      };
  
      const listedObjects = await s3.send(new ListObjectsV2Command(listParams));
  
      if (listedObjects.Contents && listedObjects.Contents.length > 0) {
        const deleteParams = {
          Bucket: bucketName,
          Delete: {
            Objects: listedObjects.Contents.map((item) => ({ Key: item.Key })),
          },
        };
  
        await s3.send(new DeleteObjectsCommand(deleteParams));
        console.log(`Folder ${folderKey} deleted successfully from S3.`);
      }
      return { success: true };
    } catch (error) {
      console.error(`Error deleting folder ${folderKey} from S3:`, error);
      return { error: "Failed to delete folder from S3" };
    }
  }
  

  async function updateProjectCollection(projectCollection: any, projectIndex: number) {
    projectCollection.projects.splice(projectIndex, 1);
    return projectCollection.save();
  }

async function checkUrlStatus(url: string): Promise<string> {
    try {
        const response = await axios.head(url);
        return response.status >= 200 && response.status < 400 ? "online" : "offline";
    } catch (error) {
        console.error(`Error checking URL status for ${url}:`, error);
        return "offline";
    }
}