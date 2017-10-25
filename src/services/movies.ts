import { IMDB } from './../services/imdb_api';
import { MoviesNames } from './../services/movies_names';

import { Http } from './http_req'

export class Movies {
  constructor(
    public movienames: MoviesNames, 
    public imdb: IMDB,
    public http: Http
  ) {}

  getMovieNames(): Promise<any> {
    return this.http.makeRequest(this.movienames.getRequestObject());
  }

  getMovie(name): Promise<any> {
    return this.http.makeRequest(this.imdb.generateRequestObject(name));
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
