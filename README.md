# Shift-Sync
![Architecture drawio](https://user-images.githubusercontent.com/37774202/234840502-9556ed10-9b25-46f7-9c66-2aa6b8996f60.svg)

| Services | Reason |
|----------|--------|
| S3       | Used S3 bucket for storing profile pictures of employees. |
| Secrets Manager | Stored all Database credentials and JWT’s key and age. |
| API Gateway | Used as endpoint of mail sending API. |
| SQS | Storing all the messages in a Queue that is got in API gateway payload. |
| Lambda | Wrote a function for sending mail and pushed it to dockerhub as an image. Lambda service is fetching the image and trigger when the message added in the SQS Queue. |
| VPC | Created a virtual private cloud for securing the application in cloud. This results in decreasing the latency of internal communication of application. Allocated a 192.168.0.0/24 CIDER block. |
| Public Subnet | Created public subnet in VPC to deploy frontend instance. As frontend of application should be  accessible to everyone. Allocated a 192.168.0.0/25 CIDER block. |
| Private Subnet | Created Private subnet in VPC to deploy backend of the application. Backend should be secure, and not accessible to anyone directly as business logic is in the backend. Allocated a 192.168.0.128/25 CIDER block. |
| NAT Gateway | Used to connect Private subnet’s backend instance to other AWS services and internet for downloading dependencies. As NAT Gateway by default blocked the inbound traffic to secure the Private subnet’s instances. |
| Internet Gateway | Used to connect the Public subnet’s frontend instance to the internet. |
| Route Table | Used for managing the traffic of the internet and internal communication. |
| EC2 | Used it for deploying the frontend and backend of the application. |

