const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const secretsManager = new AWS.SecretsManager({
    region: "us-east-1",
  });

  const data = await secretsManager
    .getSecretValue({ SecretId: process.env.SHIFT_SYNC_SECRET_MANAGER_NAME })
    .promise();
  const secret = JSON.parse(data.SecretString);
  console.log(secret);
  console.log(event);
  for (Record of event.Records) {
    console.log(Record);
    const { to, message, subject } = JSON.parse(Record.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: secret.SENDER_EMAIL,
        pass: secret.SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: secret.SENDER_EMAIL,
      to: to,
      subject: subject,
      text: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return {
        statusCode: 200,
        body: JSON.stringify("Email sent successfully!"),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify("Error sending email!"),
      };
    }
  }
};
