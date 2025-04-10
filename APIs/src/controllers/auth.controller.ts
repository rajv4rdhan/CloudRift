import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, role, company } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      res.status(400).json({ message: "User exists" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash,email, role, company  });

    res.status(201).json({ token: generateToken(user._id.toString()) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ token });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};


export const getDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    console.log(userId);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    res.status(200).json({ username: user.username });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};