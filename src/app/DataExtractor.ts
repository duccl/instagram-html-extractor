import { load } from 'cheerio';
import { Reader } from './Reader';
import { autobind } from 'core-decorators';

@autobind
export class DataExtractor {
  private queryEvaluator: CheerioStatic;
  private tags: Record<string, number> = {};
  constructor(content: Buffer) {
    this.queryEvaluator = load(content);
  }

  public query(css_selector: string) {
    return this.queryEvaluator(css_selector);
  }

  public alter_queryEvaluator(new_data: string) {
    this.queryEvaluator = load(new_data);
  }

  /**
   * get_posts_url
   */
  public get_posts_url(posts_css_selector: string) {
    const posts_query = this.query(posts_css_selector);
    const href_data = [];
    for (let index = 0; index < posts_query.length; index++) {
      href_data.push(posts_query[index].attribs['href']);
    }
    return href_data;
  }

  private save_tag(element: CheerioElement) {
    const tag_text = this.queryEvaluator(element).attr('content') as string;
    this.tags[tag_text] = !!this.tags[tag_text] ? this.tags[tag_text] + 1 : 1;
  }

  public populate_tags_data(css_selector: string) {
    this.query(css_selector).each((index: number, element: CheerioElement) => this.save_tag(element));
  }

  public exportData = () => JSON.stringify(this.tags, null, 2);

  public toString() {
    return this.tags;
  }
}
