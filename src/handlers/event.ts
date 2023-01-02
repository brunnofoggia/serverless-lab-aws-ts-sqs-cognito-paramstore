import AWS from "aws-sdk";

import { sendResponse } from "../functions";

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCOUNT = process.env.account_id;

var sqs = new AWS.SQS({ region: AWS_REGION });
const QUEUE_URL = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT}/${process.env.queue}`;


const listener = async (event) => {
    console.log('sqs works');
    event.Records.forEach(record => {
        console.log('record', JSON.parse(record.body));
    });

    return sendResponse(200, { message: `sqs works` });
};

const trigger = async (event) => {
    console.log(event.body, typeof event.body);

    const params = {
        MessageBody: event.body,
        QueueUrl: QUEUE_URL
    };

    await sqs.sendMessage(params).promise();

    return sendResponse(200, { message: `Email ${event.requestContext.authorizer.claims.email} has been authorized. SQS was triggered` });
};

export {
    listener,
    trigger
};