import { readFileSync } from 'fs';
import { autobind } from 'core-decorators';

@autobind
export class Reader {
  read_all_content = (file: string) => readFileSync(file).toString();
}
