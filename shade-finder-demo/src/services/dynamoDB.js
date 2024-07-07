import dynamoDB from "../aws-config";

const saveEmail = async (email) => {
  const params = {
    TableName: "UserEmails",
    Item: {
      email: email,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Email saved successfully");
  } catch (error) {
    console.error("Error saving email:", error);
  }
};

export default saveEmail;
