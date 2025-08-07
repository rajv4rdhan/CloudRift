import { Request, Response } from "express";
import {ChatModel} from "../../models/chat/text.model"
import {FileModel} from './../../models/chat/file.model'

export const getChatSession = async(req:Request, res: Response): Promise<void>=>{
    try{
        const userId = (req as any).user.id;
        const session = await ChatModel.find(
            { username: userId },
            { username: 1, projectName: 1, _id: 1 }
        );
        if(!session){
            res.status(404).json({message:"chat session not found"});
        }
        res.status(201).json(session);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
} 

export const getSingleChat = async(req:Request, res: Response): Promise<void>=>{
    try{
        const userId = (req as any).user.id;
        const {_id} = req.body;

        const chat = await ChatModel.findOne({username: userId, _id: _id})
        if(!chat){
            res.status(404).json({message:"chat not found"});
        }
        res.status(201).json(chat);
    }catch(error){
        res.status(500).json({message: "Internal server Error"});
    }
}

export const createChatSession = async(req: Request, res: Response) =>{
    try{
        const userId = (req as any).user.id;
        const {projectName} = req.body;
        
        if(!projectName){
            res.status(400).json({message:"Project name is required"});
            return;
        }

        // Create new file document
        const fileSession = new FileModel({
            userName: userId,
            projectName: projectName,
            file: []
        });
        await fileSession.save();

        // Create new chat document
        const chatSession = new ChatModel({
            username: userId,
            projectName: projectName,
            chat: [],
            files: fileSession._id
        });
        await chatSession.save();

        res.status(201).json({
            sessionId: chatSession._id,
            projectName: projectName,
            message: "New chat session created successfully"
        });

    }catch(error){
        console.error("Error creating chat session:", error);
        res.status(500).json({message: "Internal server error"});
    }
}
