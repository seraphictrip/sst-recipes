import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiHandler } from "sst/node/api";

export const handler = async (evt: APIGatewayProxyEvent) => {

  return {
    statusCode: 200,
    body: JSON.stringify(evt.requestContext.authorizer),
  };
};
