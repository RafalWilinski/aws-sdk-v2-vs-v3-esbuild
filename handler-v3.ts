import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const s3client = new S3Client({});

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const multipartUpload = new Upload({
    client: s3client,
    params: { Bucket: "bucket", Key: "key", Body: "123" },
  });

  await multipartUpload.done();
  await client.send(
    new PutCommand({
      TableName: "table",
      Item: {
        id: Math.random(),
        event,
      },
    })
  );

  return {
    statusCode: 200,
    body: "OK",
  };
};
