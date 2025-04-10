import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import demoRoutes from "./routes/demo.route";
import uploadS3 from "./routes/upload.route";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/upload", uploadS3);
export default app;
