# Shift-Sync
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

