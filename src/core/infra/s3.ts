import { S3 as S3Client } from 'aws-sdk';
import { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import { lookup } from 'mime-types';
import { Config } from '../config';
import { AwsConfigs } from '../types';

export class S3 {
  private static _s3: S3Client;
  private _awsConfigs = Config.get<AwsConfigs>('AWS');

  private constructor() {
    const { accessKey, secretKey, region } = this._awsConfigs;
    S3._s3 = new S3Client({ accessKeyId: accessKey, secretAccessKey: secretKey, region });
  }

  private static getInstance(): S3Client {
    if (!this._s3) new S3();

    return this._s3;
  }

  public static async getObject<T>(bucketName: string, key: string, isJson = true): Promise<T> {
    const params: GetObjectRequest = { Bucket: bucketName, Key: key };
    return this.getInstance()
      .getObject(params)
      .promise()
      .then(({ Body }) => (!!isJson ? JSON.parse(Body?.toString() as string) : Body))
      .catch(error => {
        throw new Error(error);
      });
  }

  public static async uploadObject(bucketName: string, key: string, body: Buffer, isPrivate = false) {
    const mimeType = lookup(key);
    const contentType = typeof mimeType === 'string' ? mimeType : undefined;
    const innerBody = contentType !== 'application/json' ? body : JSON.stringify(JSON.parse(body.toString()));

    const params: PutObjectRequest = { Body: innerBody, Bucket: bucketName, ContentType: contentType, Key: key };
    if (!!!isPrivate) params.ACL = 'public-read-write';

    return this.getInstance().putObject(params).promise();
  }
}
