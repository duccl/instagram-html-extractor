import { SQSEvent } from 'aws-lambda';
import { run } from './run';

exports.handler = (event: SQSEvent) => run(event);
