import * as request from 'request';
import * as rp from 'request-promise'
import { IMDB } from './../services/imdb_api';
import { MoviesNames } from './../services/movies_names';

export class HTTP {
  options: Object;
  constructor(public movienames: MoviesNames, public imdb: IMDB) {
    this.options = {}
  }

  isReqSuccess(err, res): boolean {
    if (!err && res.statusCode == 200) {
      return true
    } else {
      return false
    }
  }

  createPromiseOption(url) {
    return {
      uri: url,
      json: true
    };
  }

  createPromise(options) {
    return rp(options);
  }

  do() {
    rp({uri: 'http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz'}).then(
      (json) => console.log(json)
    );
  }

  getMovieNames(): Promise<any> {
    return rp(this.movienames.reqOptions());
  }

  getMovie(name): Promise<any> {
    console.log(`getMovie() is called  [${name}]`);
    return rp(this.imdb.reqOptions(name))
      .catch(`${name} is didn't work!`);
  }

  getListOfMovies(): Promise<any> {
    return this.getMovieNames()
      .then((names) => {
        let list = this.createAList(names);
        return this.allMovies(list);
      })
  }

  createAList(names): Promise<any>[] {
    let list: Promise<any>[] = [];
    names.forEach(name => {
      let newpromise = this.getMovie(name);
      list.push(newpromise);
    })
    return list;
  }

  allMovies(list: Promise<any>[]): Promise<any> {
    return Promise.all(list)
    .then((data) => {
      return { 'movies' : data }
    })
    .catch((err) => {
      console.log(err)
      return { 'movies' : err }
    });
  }

}
