// import * as request from 'request';
var cheerio = require('cheerio');

export class MoviesNames {
  url: string;

  constructor() {
    this.url = 'xxxxxxxxxxxxxxx';
  }

  reqOptions() {
    return {
      uri: this.url,
      transform: (htmlpage) => {
        let $ = this.parseHtml(htmlpage);
        let names = this.getAllMovieNames($);
        return names;
      }
    }
  }

  logError(url) {
    console.log(`Error: Unable to hit the URL[${url}]`)
  }

  parseHtml(html): string {
    let $ = cheerio.load(html);
    return $;
  }

  getAllMovieNames($) {
    let list = [];
    for (var index = 1; index <= 97; index++) {
      let moviename = this.getMovieFromCheerio($, index);
      list.push(moviename);  
    }
    return list;
  }

  getMovieFromCheerio($, index) {
    return $(this.getSelectorPath(index)).html();
  }

  getSelectorPath(index): string {
    return `#main > div > div.list.detail > div:nth-child(${index}) 
      > div.info > b > a`
  }

}