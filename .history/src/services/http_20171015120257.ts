import * as request from 'request';

export class HTTP {
  constructor(public movienames: any) {}

  getMovieNames() {
    request(this.movienames.url, (err, res, html) => {
      if(this.movienames.isReqSuccess(err, res)) {
        let $ = this.movienames.parseHtml(html);
        let names = this.movienames.getAllMovieNames($);
        console.log(names);
      } else {
        this.movienames.logError()
      }
    })
  }

}