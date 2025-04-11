import { log } from "console";
import mongoose from "mongoose";

interface ProjectCollection {
    username: string;
    projects: typeof project[]; 
    logs_processed?: Date;
  }

const logs = new mongoose.Schema({
    visitors: { type: Number, default: 0 },
    bandwidth_mb: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
});

const project = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectDescription: { type: String},
    projectUrl: { type: String, required: true },
    domain: { type: String, required: true },
    projectStatus: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    logs: { type: logs, required: true },
});

const projectCollectionSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    projects: [project],
    logs_processed : { type: Date, default: Date.now },
});

export const ProjectCollection = mongoose.model("ProjectCollection", projectCollectionSchema);