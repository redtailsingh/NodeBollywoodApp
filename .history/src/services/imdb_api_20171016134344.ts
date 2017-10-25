
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
        let pr = this.parseFirst(res)
        this.count += 1;
        if(this.isResSuccess(pr)) {
          let withid = this.addMovieTitleToRes(pr, moviename);
          return this.addIdToMovie(withid);
        } else {
          return this.addIdToMovie(pr);
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
