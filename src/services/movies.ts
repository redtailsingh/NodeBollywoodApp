import { IMDB } from './imdb_api';
import { MoviesNames } from './movies_names';
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

  buildMovies(names): Promise<any> {
    let list = names.map((movie) => this.getMovie(movie))
    return Promise.all(
      list.map((promise) => this.handleFailedHttpReq(promise))).then((values) => {
        return values
      });
  }

  getMovie(name): Promise<Movie> {
    return this.http.makeRequest(this.imdb.generateRequestObject(name))
  }

  handleFailedHttpReq = (promise) => {
    return promise
    .then(result => (result))
    .catch(error => this.imdb.handleMovieNotFound(
      this.getMovieName(error)
    ));
  };

  getMovieName = (error: any): string => {
    let uri = this.pareseMovieUrl(error)
    return this.parseMovieName(uri)
  }

  pareseMovieUrl = (error: any): string => {
    return error.options.uri
  }

  parseMovieName = (url: string): string => {
    return url.match(new RegExp('/?t=(.*)&y='))[1]
  }

}
