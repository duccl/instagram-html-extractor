import { load } from 'cheerio';
import { Reader } from './Reader';
import { autobind } from "core-decorators";

@autobind
export class DataExtractor {
    private queryEvaluator: CheerioStatic;
    private tags: Record<string, number> = {};
    constructor(reader: Reader) {
        this.queryEvaluator = load(reader.read_all_content());
    }

    private save_tag(element:CheerioElement){
        const tag_text = this.queryEvaluator(element).text()
        this.tags[tag_text] = !!this.tags[tag_text] ? this.tags[tag_text] + 1 : 1;
    }

    public populate_tags_data(css_selector: string) {
        this.queryEvaluator(css_selector).each((index: number, element: CheerioElement) => this.save_tag(element))
    }

    public toString(){
        return this.tags
    }
}