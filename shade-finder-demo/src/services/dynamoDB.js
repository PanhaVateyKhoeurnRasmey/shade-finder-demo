const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const saveEmail = async (email, s3Url) => {
  const params = {
    TableName: "shade-finder-demo-email-collection",
    Item: {
      email: email,
      s3Url: s3Url,
      timestamp: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Email and S3 URL saved successfully");
  } catch (error) {
    console.error("Error saving email and S3 URL:", error);
  }
};

module.exports = saveEmail;
