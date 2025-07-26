import { PutObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../../config/s3";

export const uploadToS3 = async (
  fileBuffer: Buffer,
  key: string,
  contentType: string
) => {
  const Bucket = process.env.AWS_BUCKET_NAME;

  if (!Bucket) {
    throw new Error("S3 bucket name is missing in environment variables.");
  }

  const command = new PutObjectCommand({
    Bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    const response = await s3Client.send(command);
    console.log("[DEBUG]Successfully uploaded to S3:", key, response);

    return {
      success: true,
      key,
      location: `${process.env.ENDPOINT_URL}/${Bucket}/${key}`,
      response,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

export const deleteFromS3 = async (key: string) => {
  const Bucket = process.env.AWS_BUCKET_NAME;

  if (!Bucket) {
    throw new Error("S3 bucket name is missing in environment variables.");
  }

  const command = new DeleteObjectCommand({
    Bucket,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    console.log("[DEBUG]Successfully deleted from S3:", key, response);
    return {
      success: true,
      key,
      response,
    };
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
};
