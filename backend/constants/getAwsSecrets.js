const AWS = require("aws-sdk");
require("dotenv").config();
const secretName = "ShiftSync-Secrets-dev";

const credentials = new AWS.Credentials({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});
const secretsManager = new AWS.SecretsManager({
  // credentials: credentials,
  region: "us-east-1",
});

exports.awsSecret = async () => {
  const data = await secretsManager
    .getSecretValue({ SecretId: secretName })
    .promise();
  const secret = data.SecretString;
  return secret;
};
