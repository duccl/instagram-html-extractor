import { Reader } from './Reader';
import {DataExtractor} from './DataExtractor'

const reader = new Reader(__dirname + '\\index.html');
const extractor = new DataExtractor(reader);
extractor.populate_tags_data("h2 + span > a[href*='explore/tags/']")
console.log(extractor.toString())