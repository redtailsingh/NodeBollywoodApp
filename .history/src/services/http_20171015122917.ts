import * as request from 'request';
import { IMDB } from './../services/imdb_api';
import { MoviesNames } from './../services/movies_names';

export class HTTP {
  constructor(public movienames: MoviesNames, public imdb: IMDB) {}

  getMovieNames() {
    let obj = this.movienames;
  
    request(obj.url, (err, res, html) => {
      if(obj.isReqSuccess(err, res)) {
        let $ = obj.parseHtml(html);
        let names = obj.getAllMovieNames($);
        console.log(names);
      } else {
        obj.logError()
      }
    })
  }

  getMovie(name) {
    let obj = this.imdb;
    let url = obj.getUrl(name)

    request(url, (err, res, html) => {
      if(this.movienames.isReqSuccess(err, res)) {

      } else {
        this.movienames.logError()
      }
    })
  }

}