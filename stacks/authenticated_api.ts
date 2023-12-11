import { StackContext, Api, Cognito } from "sst/constructs";
import * as iam from 'aws-cdk-lib/aws-iam'

/*
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html
https://docs.sst.dev/constructs/Api#authorization
 */

export function API({ stack, app }: StackContext) {

  const userPool = new Cognito(stack, "Auth", {
    login: ["email"],
  });


  const api = new Api(stack, "Api", {
    authorizers: {
        // JWT authorizer using cognito user pool
      myAuthorizer: {
        type: "user_pool",
        userPool: {
          id: userPool.userPoolId,
          clientIds: [userPool.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer", // iam for just sign in
      authorizationScopes: ["user.id", "user.email"],
    },
    routes: {
        "GET /": "packages/functions/src/lambda.handler",
        "GET /notes": "packages/functions/src/lambda.handler",
    },
  });

  userPool.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api
  ])


  stack.addOutputs({
    ApiEndpoint: api.url,
    Region: app.region,
    UserPoolId: userPool.userPoolId,
    UserPoolClientId: userPool.userPoolClientId,
    IdentityPoolId: userPool.cognitoIdentityPoolId,
  });
}

