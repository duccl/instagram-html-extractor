import {DataExtractor} from './DataExtractor';
import {Requestor} from './Requestor';

(async () => {
  const requestor = new Requestor()
  const extractor = new DataExtractor(`${__dirname}/index.html`);
  const posts_urls = extractor.get_posts_url('a[href*="/p/"]')
  console.log(posts_urls)
  
  const arrayPromise = posts_urls.map(url => requestor.Get_Instagram_Post(`https://www.instagram.com${url}`));
  const array = await Promise.all(arrayPromise);

  const new_s = array.join(' ');
  extractor.alter_queryEvaluator(new_s)
  extractor.populate_tags_data('meta[property="instapp:hashtags"]')
  console.log(extractor.toString())
})();
