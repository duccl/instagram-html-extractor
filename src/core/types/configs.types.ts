export type Configs = 'AWS' | 'PROCESS';

export type AwsConfigs = {
  accessKey: string;
  secretKey: string;
  region: string;
  bucket: string;
};

export type ProcessConfigs = {
  extractionFileKey: string;
  downloadFileKey: string;
};

export type ConfigType = AwsConfigs | ProcessConfigs;
