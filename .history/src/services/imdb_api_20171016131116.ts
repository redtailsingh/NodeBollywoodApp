
export class IMDB {
  baseurl: string;
  apikey: string;
  count: number;

  constructor() {
    this.baseurl = 'http://www.omdbapi.com/';
    this.apikey = 'BanMePlz';
    this.count = 0

  }

  reqOptions(moviename) {
    return {
      uri: this.createUrl(moviename),
      transform: (movie) => {
        this.count += 1;
        this.addIdToMovie(this.parseFirst(movie))
      }
    }
  }

  parseFirst(movie: string) {
    return JSON.parse(movie)
  }

  addIdToMovie(movie: Object) {
    let newobj = {};
    return Object.assign(newobj, movie, { id: this.count })
  }

  createUrl(moviename) {
    //http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz
    return `${this.baseurl}?t=${moviename}&y=2017&apikey=${this.apikey}`
  }

  logError(url) {
    console.log(`Error: Unable to hit the URL[${url}]`)
  }

}
