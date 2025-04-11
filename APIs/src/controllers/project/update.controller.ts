import { ProjectCollection } from "../../models/project.model";
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

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