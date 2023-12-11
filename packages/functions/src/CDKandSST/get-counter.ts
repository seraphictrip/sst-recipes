import { ApiHandler } from "sst/node/api";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();


export const handler = ApiHandler(async (_evt) => {

    const query: AWS.DynamoDB.ScanInput = {
        TableName: process.env['COUNTER_TABLE_NAME'] || ""
    }
    try {
        const data = await dynamoDb.scan(query).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        }
    } catch(e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e})
        }
    }


});
