import {Request, Response} from 'express'
import { ChatModel } from './../../models/chat/text.model'
import {FileModel} from './../../models/chat/file.model'
import ChatClient from './../../services/chat/client'
import mongoose from 'mongoose'

export const getChatHistory = async(req: Request, res: Response) =>{
    try{
        const userId = (req as any).user.id;
        const {id} = req.params;
        const _id = id;
        if(!_id){
            res.status(400).json({message:"Session ID is required"});
            return;
        }
        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(400).json({message:"Invalid session ID format"});
            return;
        }
        
        const chatHistory = await ChatModel.findOne({username: userId, _id:_id}).populate('files', 'file createdAt updatedAt');
        if(!chatHistory){
            res.status(404).json({message:"Chat session not found"});
            return;
        }
        res.status(200).json(chatHistory);
    }catch(error){
        console.error("Error fetching chat history:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const chat = async(req: Request, res: Response) =>{
    try{
        const userId = (req as any).user.id;
        const {id} = req.params;
        const {message} = req.body;
        const _id = id;
        if(!message){
            res.status(400).json({message:"Message is required"});
            return;
        }

        let chatSession = null;
        let fileSession = null;

        if(!_id){
            res.status(400).json({message:"Session ID is required. Please create a session first."});
            return;
        }

        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(400).json({message:"Invalid session ID format"});
            return;
        }

        console.log(`Searching for existing session with _id: ${_id} and userId: ${userId}`);
        chatSession = await ChatModel.findOne({username: userId, _id:_id});
        
        if(!chatSession){
            res.status(404).json({message:"Chat session not found. Please create a session first."});
            return;
        }

        console.log(`Found existing chat session: ${chatSession._id}`);
        fileSession = await FileModel.findById(chatSession.files);
        
        if(!fileSession){
            console.log(`No file session found for files ID: ${chatSession.files}`);
            res.status(500).json({message:"Associated file session not found"});
            return;
        }
        
        console.log(`Found associated file session: ${fileSession._id}`);

        const client = new ChatClient();
        const grpcResponse = await client.sendMessage(message);
        
        const parsedResponse = typeof grpcResponse === 'string' ? JSON.parse(grpcResponse) : grpcResponse;
        
        const chatEntry = {
            user: message,
            system: parsedResponse.message.content
        };
        chatSession.chat.push(chatEntry as any);
        await chatSession.save();

        if(parsedResponse.files && parsedResponse.files.length > 0 && fileSession){
            fileSession.file.push(...parsedResponse.files);
            await fileSession.save();
        }

        res.status(200).json({
            sessionId: chatSession._id,
            message: parsedResponse.message.content,
            files: parsedResponse.files || [],
            filesCount: parsedResponse.files ? parsedResponse.files.length : 0
        });

    }catch(error){
        console.error("Error in chat:", error);
        res.status(500).json({message: "Internal server error"});
    }
}
