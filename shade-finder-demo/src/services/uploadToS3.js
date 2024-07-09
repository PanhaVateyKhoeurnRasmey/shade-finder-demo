import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = process.env.REACT_APP_AWS_REGION;
const BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
const ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

console.log("AWS Access Key:", process.env.REACT_APP_AWS_ACCESS_KEY_ID);
console.log(
  "AWS Secret Access Key:",
  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
);
console.log("AWS Region:", process.env.REACT_APP_AWS_REGION);
console.log("Bucket Name:", process.env.REACT_APP_AWS_BUCKET_NAME);

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file) => {
  const fileName = `images/${Date.now()}_${file.name}`;
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export default uploadToS3;
