import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IText extends Document {
    system: string;
    user: string;
}

export interface IChat extends Document {
    _id: Types.ObjectId;
    username: string;
    projectName: string;
    chat: IText[];
    createdAt?: Date;
    updatedAt?: Date;
    files: Types.ObjectId;
}

const TextSchema: Schema<IText> = new Schema<IText>(
    {
        system: { type: String, required: true },
        user: { type: String, required: true },
    },
    { _id: false }
);

const ChatSchema: Schema<IChat> = new Schema<IChat>(
    {
        username: { type: String, required: true },
        projectName: {type: String, required: true},
        chat: { type: [TextSchema] },
        files: { type: mongoose.Schema.Types.ObjectId, ref: "Files" },
    },
    { timestamps: true }
);

export const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", ChatSchema);



