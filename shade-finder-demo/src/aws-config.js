import AWS from "aws-sdk";
// import dotenv from "dotenv";

// dotenv.config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
