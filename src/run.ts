import { SQSEvent } from 'aws-lambda';
import { app } from './app';

export const run = (event?: SQSEvent) => {
  const jobs = event?.Records?.map(({ receiptHandle: receipt, body }) => ({ job: JSON.parse(body), receipt })) || [{}];
  console.log(jobs);
  return app();
};
