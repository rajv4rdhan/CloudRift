// src/routes/demo.route.ts
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({ 
    message: "This is a protected route", 
    user: (req as any).user 
  });
});

router.get("/public", (req: Request, res: Response) => {
  res.json({ message: "This is a public route" });
}
);

export default router;