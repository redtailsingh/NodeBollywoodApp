
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
      transform: (res) => {
        if(this.isResSuccess(res)) {
          this.count += 1;
          return this.addIdToMovie(this.parseFirst(res))
        } else {
          return this.addMovieTitleToRes(res, moviename)
        }
      }
    }
  }

  isResSuccess(res) {
    if('Error' in res) {
      return true;
    } else {
      return false;
    }
  }

  addMovieTitleToRes(res, moviename) {
    let newobj = {}
    return Object.assign(newobj, res, { Title: moviename })
  }

  parseFirst(movie: string) {
    return JSON.parse(movie)
  }

  addIdToMovie(movie: Object) {
    let newobj = {};
    return Object.assign(newobj, movie, { id: this.count })
  }

  createUrl(moviename: string) {
    //http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz
    return `${this.baseurl}?t=${moviename}&y=2017&apikey=${this.apikey}`
  }


}
