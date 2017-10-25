
export class IMDB {
  baseurl: string;
  apikey: string;
  count: number;

  constructor() {
    this.baseurl = 'http://www.omdbapi.com/';
    this.apikey = 'BanMePlz';
    this.count = 0

  }

  reqOptions(moviename: string) {
    return {
      uri: this.createUrl(moviename),
      transform: (res: string) => {
        return this.handleRes(res, moviename);
      }
    }
  }

  handleRes(res: string, moviename: string): Object {
    let pr = this.parseFirst(res)
    this.count += 1;
    
    if(this.isApiResSuccess(pr)) {
      return this.addIdToRes(pr);
    } else {
      return this.handleMovieNotFound(moviename)
    }
  }

  isApiResSuccess(res: Object) {
    if(res['Response'] === "True") {
      return true;
    } else {
      return false;
    }
  }

  handleMovieNotFound(moviename: string) {
    let withnovalue = this.returnMovieWithNoValues(moviename)
    return this.addIdToRes(withnovalue);
  }

  returnMovieWithNoValues(moviename) {
    return {
      Title: moviename,
      Year: "N/A",
      Rated: "N/A",
      Released: "N/A",
      Runtime: "N/A",
      Genre: "N/A",
      Director: "N/A",
      Writer: "N/A",
      Actors: "N/A",
      Plot: "N/A",
      Language: "N/A",
      Country: "N/A",
      Awards: "N/A",
      Poster: "N/A",
      Ratings: "N/A",
      Metascore: "N/A",
      imdbRating: "N/A",
      imdbVotes: "N/A",
      imdbID: "N/A",
      Type: "N/A",
      DVD: "N/A",
      BoxOffice: "N/A",
      Production: "N/A",
      Website: "N/A",
      Response: "False"
      }
  }

  addMovieTitleToRes(res: Object, moviename: string) {
    let newobj = {}
    return Object.assign(newobj, res, { Title: moviename })
  }

  parseFirst(movie: string) {
    return JSON.parse(movie)
  }

  addIdToRes(movie: Object) {
    let newobj = {};
    return Object.assign(newobj, movie, { id: this.count })
  }

  createUrl(moviename: string) {
    //http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz
    return `${this.baseurl}?t=${moviename}&y=2017&apikey=${this.apikey}`
  }
  
}
