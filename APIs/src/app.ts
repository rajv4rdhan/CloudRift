import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import demoRoutes from "./routes/demo.route";
import uploadS3 from "./routes/upload.route";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/upload", uploadS3);
export default app;
