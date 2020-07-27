import { AwsConfigs, Config, getFoldersStructure, ProcessConfigs, S3 } from '../core';
import { DataExtractor } from './DataExtractor';
import { Requestor } from './Requestor';

const configs = {
  aws: Config.get<AwsConfigs>('AWS'),
  process: Config.get<ProcessConfigs>('PROCESS'),
};

export const app = async (): Promise<void> => {
  const { aws, process } = configs;
  const { downloadFileKey, extractionFileKey } = process;
  const { bucket } = aws;

  const downloadS3Key = ['metadata', getFoldersStructure(), downloadFileKey].join('/');
  const htmlFile = await S3.getObject<Buffer>(bucket, downloadS3Key, false);
  const requestor = new Requestor();
  const extractor = new DataExtractor(htmlFile);
  const posts_urls = extractor.get_posts_url('a[href*="/p/"]');
  console.log(posts_urls);

  const arrayPromise = posts_urls.map(url => requestor.Get_Instagram_Post(`https://www.instagram.com${url}`));
  const array = await Promise.all(arrayPromise);

  const new_s = array.join(' ');
  extractor.alter_queryEvaluator(new_s);
  extractor.populate_tags_data('meta[property="instapp:hashtags"]');
  console.log(extractor.toString());

  const extractedData = extractor.exportData();

  const extractionS3Key = ['metadata', getFoldersStructure(), extractionFileKey].join('/');
  await S3.uploadObject(bucket, extractionS3Key, Buffer.from(extractedData));
};
