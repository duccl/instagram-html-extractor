import { ProcessConfigs, RecordSet } from '../../../types';

const { DOWNLOAD_FILE_KEY, EXTRACTION_FILE_KEY } = process.env as RecordSet<string>;

export function loadProcessConfigs(): ProcessConfigs {
  ['DOWNLOAD_FILE_KEY', 'EXTRACTION_FILE_KEY'].forEach(variable => {
    if (!(variable in process.env)) throw new Error(`${variable} environment variable is required.`);
  });

  return {
    downloadFileKey: DOWNLOAD_FILE_KEY,
    extractionFileKey: EXTRACTION_FILE_KEY,
  };
}
