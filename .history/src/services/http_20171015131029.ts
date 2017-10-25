import * as request from 'request';
import { IMDB } from './../services/imdb_api';
import { MoviesNames } from './../services/movies_names';

export class HTTP {
  constructor(public movienames: MoviesNames, public imdb: IMDB) {}

  getMovieNames() {
    let obj = this.movienames;
    let url = obj.url;

    request(url, (err, res, html) => {
      if(this.isReqSuccess(err, res)) {
        let $ = obj.parseHtml(html);
        let names = obj.getAllMovieNames($);
        console.log(names);

        this.getMovie('dangal');
      } else {
        obj.logError(url)
      }
    })
  }

  getMovie(name) {
    let obj = this.imdb;
    let url = obj.getUrl(name)

    request(url, (err, res, html) => {
      if(this.isReqSuccess(err, res)) {
        console.log('res movie:' ,res)
      } else {
        obj.logError(url)
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


}