import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import { RemovalPolicy } from "aws-cdk-lib/core";
import { StackContext, Table, Api } from "sst/constructs";



/**
 * All CDK constructs and CloudFormation resources are supported in SST apps.
 * https://docs.sst.dev/advanced/extending-sst#using-cdk-constructs
 * SST maintains a family of built-in constructs that makes it easy to build full-stack apps. We'll be adding more constructs like these to the family and it's usually based on the type of requests we get from the community. But it's possible that the resources you need to create are not yet supported by SST. In this case, you can fallback to using the underlying CDK constructs. And in the case an AWS resource is not yet supported by CDK, you can fallback all the way to using CloudFormation.
 * 1) Create a CDK Dynamodb table
 * 2) Create a SST Table
 * 3) Show can use in both
 */
export function CDKandSST({ stack }: StackContext) {
  
    // CDK Resources
    const table1 = new dynamodb.Table(stack, 'montable', {
        tableName: "montable",
        partitionKey: {
          name: 'id',
          type: dynamodb.AttributeType.STRING,
        },
        removalPolicy: RemovalPolicy.DESTROY
      });

      const table2 = new Table(stack, "counter", {
        fields: {
          counter: "string",
        },
    
        primaryIndex: { partitionKey: "counter" },
        
      } );

      

      const api = new Api(stack, "api", {
        defaults: {
          function: {
            // grant permission to cdk
            // just doing in defualts as example, should be down at point of least privelege
            permissions: [table1],
            environment: {
                COUNTER_TABLE_NAME: table2.tableName,
                MONTABLE_TABLE_NAME: table1.tableName
            }
          },
        },
        routes: {
          "GET /counter": {
            function: {
                handler: "packages/functions/src/CDKandSST/get-counter.handler",
                permissions: [table2],
                environment: {
                    COUNTER_TABLE_NAME: table2.tableName
                }
            }
          }, 
          "GET /montable": "packages/functions/src/CDKandSST/get-montable.handler",
        },
      });

  stack.addOutputs({
    table1: table1.tableName,
    table2: table2.tableName,
    apiEndpoint: api.url
  });
}
