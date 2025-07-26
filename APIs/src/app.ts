import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route";
import demoRoutes from "./routes/demo.route";
import uploadS3 from "./routes/project.route";
import cors from "cors";


const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());
app.get("/api/test", (req, res) => {
  res.send("Working");
});
app.use("/api/auth", authRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/project", uploadS3);
export default app;
