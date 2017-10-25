import * as request from 'request';
var cheerio = require('cheerio');

export class MoviesNames {
  url: string;

  constructor() {
    this.url = 'http://www.imdb.com/list/ls074368935/?start=1&view=detail&sort=release_date_us:desc&defaults=1&scb=0.5479821238284619';
  }

  doGetReq() {
    request(this.url, (err, res, html) => {
      if(this.isReqSuccess(err, res)) {
        let $ = this.parseHtml(html);
        let movienames = this.getAllMovieNames($);
        console.log(movienames);

      } else {
        this.logError()
      }
    })
  }

  isReqSuccess(err, res): boolean {
    if (!err && res.statusCode == 200) {
      return true
    } else {
      return false
    }
  }

  logError() {
    console.log('Error: Unable to hit the URL!')
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