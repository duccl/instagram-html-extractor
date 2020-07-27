import { AwsConfigs, RecordSet } from '../../../types';

const { LIB_AWS_BUCKET, LIB_AWS_ACCESS_KEY, LIB_AWS_SECRET_ACCESS_KEY, LIB_AWS_REGION } = process.env as RecordSet<
  string
>;

export function loadAwsConfigs(): AwsConfigs {
  ['LIB_AWS_BUCKET', 'LIB_AWS_ACCESS_KEY', 'LIB_AWS_SECRET_ACCESS_KEY', 'LIB_AWS_REGION'].forEach(variable => {
    if (!(variable in process.env)) throw new Error(`${variable} environment variable is required.`);
  });

  return {
    accessKey: LIB_AWS_ACCESS_KEY,
    secretKey: LIB_AWS_SECRET_ACCESS_KEY,
    region: LIB_AWS_REGION,
    bucket: LIB_AWS_BUCKET,
  };
}
