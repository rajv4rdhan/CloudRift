import { ProjectCollection } from "../../models/project.model";
import { Request, Response } from "express";
import { User } from "../../models/user.model";



export const getProject = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const username = user.username
        console.log("Username:", username);
        const projectCollection = await ProjectCollection.find({ username: username });

        const last_processed = projectCollection[0].logs_processed;
        const projectList = projectCollection.map(project => project.projects).flat();
        console.log("Project List:", projectList);

        if (!projectList || projectList.length === 0) {
            res.status(404).json({ error: "Project not found" });
            return;
        }

        res.status(200).json({ projectList, last_processed });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}