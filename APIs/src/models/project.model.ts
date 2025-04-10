import mongoose from "mongoose";

const project = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectDescription: { type: String},
    projectUrl: { type: String, required: true },
    projectStatus: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const projectCollectionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    projects: [project],
});

export const ProjectCollection = mongoose.model("ProjectCollection", projectCollectionSchema);