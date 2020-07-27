import { utc as moment } from 'moment';

export const getFoldersStructure = (): string => {
  const dateTimeReference = moment().format('YYYYMMDD');
  const [, y, m, d] = dateTimeReference.match(/(\d{4})(\d{2})(\d{2}).*/) as RegExpMatchArray;

  return [y, m, d].join('/');
};
