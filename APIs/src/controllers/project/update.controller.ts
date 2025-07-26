import { ProjectCollection } from "../../models/project.model";
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import dotenv from "dotenv";
dotenv.config();
import { deleteS3Folder } from "../../services/project/s3.service";
import { getStats } from "../../services/project/stats.service";
import {checkUrlStatus} from "../../services/project/urlStatus.service";

export const updateProjectStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const username = user.username;
    console.log("Username:", username);
    const projectCollection = await ProjectCollection.findOne({
      username: username,
    });

    if (!projectCollection) {
      res.status(404).json({ error: "Project collection not found" });
      return;
    }
    const domainarr = projectCollection.projects.map(
      (project) => project.domain,
    );

    const stats = await getStats(domainarr, projectCollection.logs_processed);

    for (const domain of domainarr) {
      const domainStats = stats[domain];
      if (domainStats) {
        const project = projectCollection.projects.find(
          (p) => p.domain === domain,
        );
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
};

export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const [user, projectCollection] = await Promise.all([
      User.findById(userId),
      User.findById(userId).then((u) =>
        u ? ProjectCollection.findOne({ username: u.username }) : null,
      ),
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
      (project) => project.domain === domain,
    );

    if (projectIndex === -1) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const folderKey = `${domain}/`;
    const [s3Result] = await Promise.all([
      deleteS3Folder(folderKey),
      updateProjectCollection(projectCollection, projectIndex),
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

async function updateProjectCollection(
  projectCollection: any,
  projectIndex: number,
) {
  projectCollection.projects.splice(projectIndex, 1);
  return projectCollection.save();
}

