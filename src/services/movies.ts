import { IMDB } from './../services/imdb_api';
import { MoviesNames } from './../services/movies_names';

import { Http } from './http_req';
import { Movie } from './movie';

export class Movies {
  constructor(
    public movienames: MoviesNames, 
    public imdb: IMDB,
    public http: Http
  ) {}

  getMovies(): Promise<any> {
    return this.getMovieNames()
      .then((names) => {
        return this.buildMovies(names);
      })
  }

  getMovieNames(): Promise<string[]> {
    return this.http.makeRequest(this.movienames.getRequestObject());
  }

  toResultObject(promise) {
    return promise
    .then(result => ( result ))
    .catch(error => ( error ));
  };

  buildMovies(names): Promise<any> {
    let list: Promise<any>[] = [];
    names.forEach(name => {
      let newpromise = this.getMovie(name);
      list.push(newpromise);
    })
    return Promise.all(list.map(this.toResultObject)).then((values) => {
      return values
    });
  }

  getMovie(name): Promise<Movie> {
    return this.http.makeRequest(this.imdb.generateRequestObject(name))
  }

}
