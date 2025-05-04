import {s3} from "../../config/s3";
import { S3Client, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
const bucketName = process.env.S3_BUCKET_NAME || "";

export async function deleteS3Folder(folderKey: string) {
    try {
      const listParams = {
        Bucket: bucketName,
        Prefix: folderKey,
      };
  
      const listedObjects = await s3.send(new ListObjectsV2Command(listParams));
  
      if (listedObjects.Contents && listedObjects.Contents.length > 0) {
        const deleteParams = {
          Bucket: bucketName,
          Delete: {
            Objects: listedObjects.Contents.map((item) => ({ Key: item.Key })),
          },
        };
  
        await s3.send(new DeleteObjectsCommand(deleteParams));
        console.log(`Folder ${folderKey} deleted successfully from S3.`);
      }
      return { success: true };
    } catch (error) {
      console.error(`Error deleting folder ${folderKey} from S3:`, error);
      return { error: "Failed to delete folder from S3" };
    }
  }