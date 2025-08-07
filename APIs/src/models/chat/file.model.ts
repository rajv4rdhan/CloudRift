import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IFile extends Document{
    filename: string,
    content: string
}

export interface IFiles extends Document{
    _id: Types.ObjectId;
    userName: string,
    projectName: {type: String, required: true},
    file: [IFile],
    createdAt?: Date;
    updatedAt?: Date;
}

const fileSchema: Schema<IFile> = new Schema<IFile>({
        filename:{type: String},
        content: {type: String},
},
{ _id: false })

const filesSchema: Schema<IFiles> = new Schema<IFiles>(
    {
        userName: {type:String, required:true},
        projectName: {type: String, required:true},
        file: [fileSchema]
    },
    { timestamps: true }
)
export const FileModel: Model<IFiles> = mongoose.model<IFiles>("Files", filesSchema);
