import { ApiKey, ApiKeySourceType, Cors, RestApi, UsagePlan, LambdaRestApiProps, EndpointType, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StackContext } from 'sst/constructs';

// https://docs.sst.dev/constructs/ApiGatewayV1Api is supposed to be able to do this, 
// but documentation is wrong on how... so falling back to CDK
export function API({ stack }: StackContext) {

  // create the api key
  const apiKey = new ApiKey(stack, "ApiKey");


  // create our handler
  const lambdaProps: lambda.FunctionProps = {
    code: lambda.Code.fromAsset(`lambda`),
    runtime: lambda.Runtime.NODEJS_16_X,
    handler: 'index.handler',
  };
  
  const lambdafunction = new lambda.Function(stack, 'LambdaFunction', lambdaProps)


  // create RestApi using higher order construct
  const apiGatewayProps: LambdaRestApiProps = {
    handler: lambdafunction,
    endpointConfiguration: {
      types: [EndpointType.REGIONAL]
    },
    defaultMethodOptions: {
      apiKeyRequired: true
    },
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
    },
    apiKeySourceType: ApiKeySourceType.HEADER,
  };

  const apiGateway = new LambdaRestApi(stack, 'LambdaRestApi', apiGatewayProps);

  // create a usagePlan
  const usagePlan = new UsagePlan(stack, 'UsagePlan', {
    name: 'Usage Plan',
    apiStages: [
      {
        api: apiGateway,
        stage: apiGateway.deploymentStage
      }
    ]
  });

  usagePlan.addApiKey(apiKey);
   

  stack.addOutputs({
    ApiEndpoint: apiGateway.url,
    API_KEY_ID: apiKey.keyId
  });
}
