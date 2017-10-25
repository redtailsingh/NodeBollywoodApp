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
        let imgtag = this.getFirstMovieName($);
        console.log(imgtag);

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
    return $
  }

  getFirstMovieName($) {
    return $('#main > div > div.list.detail > div:nth-child(1) > div.info > b > a').html()
  }

}