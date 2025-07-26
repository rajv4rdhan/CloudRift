import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import * as dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
const endpoint = process.env.ENDPOINT_URL;
const region = process.env.AWS_REGION;

if (!accessKeyId || !secretAccessKey) {
  throw new Error('AWS credentials are missing in environment variables.');
}

// const s3Client = new S3Client({
//     region: region,
//     credentials: {
//         accessKeyId: accessKeyId as string,
//         secretAccessKey: secretAccessKey as string,
//     },
// });

if (!accessKeyId || !secretAccessKey) {
  throw new Error('AWS credentials are missing in environment variables.');
}

const config: S3ClientConfig = {
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
};

const s3Client = new S3Client(config);

s3Client.middlewareStack.remove('flexibleChecksumsMiddleware');
s3Client.middlewareStack.remove('computeChecksumsMiddleware');
s3Client.middlewareStack.remove('addChecksumHeadersMiddleware');


s3Client.middlewareStack.addRelativeTo(
  (next: any) => async (args: any) => {
    if (args.request && args.request.headers) {
      delete args.request.headers['x-amz-checksum-crc32'];
      delete args.request.headers['x-amz-checksum-sha256'];
      delete args.request.headers['x-amz-content-sha256'];
      delete args.request.headers['x-amz-sdk-checksum-algorithm'];
    }
    return next(args);
  },
  {
    relation: 'before',
    toMiddleware: 'awsAuthMiddleware',
    name: 'removeB2UnsupportedHeaders',
  }
);
export default s3Client;
