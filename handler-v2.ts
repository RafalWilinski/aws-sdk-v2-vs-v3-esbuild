import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3, DynamoDB } from "aws-sdk";

const ddb = new DynamoDB.DocumentClient();
const s3 = new S3();

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await s3
    .upload({
      Bucket: "bucket",
      Key: "key",
      Body: "123",
    })
    .promise();

  await ddb
    .put({
      TableName: "table",
      Item: {
        id: Math.random(),
        event,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: "OK",
  };
};
