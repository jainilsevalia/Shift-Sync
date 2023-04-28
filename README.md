# Shift-Sync

## Cloud Architecture for the Shift-Sync Application.
![Architecture drawio](https://user-images.githubusercontent.com/37774202/234840502-9556ed10-9b25-46f7-9c66-2aa6b8996f60.svg)


|AWS Service |Reason for Use |
| ----------- | -------------- |
| Amazon S3 | Used to store profile pictures of employees. |
| AWS Secrets Manager | Used to securely store all database credentials and JWT's key and age. |
| Amazon API Gateway | Used as the endpoint for the mail sending API. |
| Amazon SQS | Used to store all messages in a queue that are received in the API Gateway payload. |
| AWS Lambda | Created a function for sending mail and pushed it to DockerHub as an image. The Lambda service fetches the image and triggers when a message is added to the SQS queue. |
| Amazon VPC | Created a virtual private cloud to secure the application in the cloud, resulting in decreased latency of internal communication of the application. A 192.168.0.0/24 CIDR block was allocated. |
| Public Subnet | Created a public subnet in the VPC to deploy the frontend instance. The frontend of the application should be accessible to everyone. A 192.168.0.0/25 CIDR block was allocated. |
| Private Subnet | Created a private subnet in the VPC to deploy the backend of the application. The backend should be secure and not directly accessible to anyone as the business logic is in the backend. A 192.168.0.128/25 CIDR block was allocated. |
| NAT Gateway | Used to connect the private subnet's backend instance to other AWS services and the internet for downloading dependencies. The NAT Gateway blocks inbound traffic by default to secure the private subnet's instances. |
| Internet Gateway | Used to connect the public subnet's frontend instance to the internet. |
| Route Table | Used for managing the traffic of the internet and internal communication. |
| Amazon EC2 | Used to deploy the frontend and backend of the application. |
| CloudFormation | Created the whole application architecture mentioned above using the CloudFormation which can be found in the CloudFormation folder in the `cloud_formation.yml` file. |

# **Prerequisites to run the application**

Create `.env` file at the root level of `server` directory and create an environment variable. This file will look like this:

```
DATABASE_URL = <PASTE DB CONNECTION URI>
S3_BUCKET_NAME = <PASTE BUCKET NAME HERE>
AWS_SECRET_MANAGER_NAME = <PASTE SECRET MANAGER NAME>
```

# **Getting Started**

## Prerequisites

-   _Node and npm is the primary requirement_. Run the following command to check if node and npm is available in your system:

```
node -v
npm -v
```

-   _Git cli:_ Download Git command line interface using this [link](https://git-scm.com/downloads). If you are not sure if you have installed git on you machine, run the following command:

```
git -v
```

-   Create AWS account and run the CloudFormation file in AWS CloudFormation service. You can find the file of Cloud Formation file here : `Shift-Sync/cloudFormation/cloud_formation.yml`  

## How to run application

After Installing Git, 

The first step is to clone the Group project repo in your machine using the below command. Run the below command at the destination in cmd where you want to clone the repository.

```
git clone https://github.com/jainilsevalia/Shift-Sync.git
```

Next, Change the directory to the client side of the project using:

```
cd .\Shift-Sync\frontend
```

Next step is, run the below command to instal all the packages and dependencies that is required to run the Assignment.

```
npm install
```

You are all set and now just run the client side using following command.

```
npm start
```

Now, To run the server side of the Assignment, open the cmd with the path of the project's repo.

Next, Change the directory to the server side of the project using:

```
cd .\Shift-Sync\backend
```

Next step is, run the below command to instal all the packages and dependencies that is required to run the Assignment.

```
npm install
```

You are all set and now just run the server side using following command.

```
npm start
```

Both the server are now up and running.
