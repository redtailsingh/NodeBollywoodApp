
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
        let newobj = {};
        this.count += 1;
        Object.assign(newobj, movie, {id: this.count})
        console.log(movie)
        return movie
      }
    }
  }

  createUrl(moviename) {
    //http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz
    return `${this.baseurl}?t=${moviename}&y=2017&apikey=${this.apikey}`
  }

  logError(url) {
    console.log(`Error: Unable to hit the URL[${url}]`)
  }

}
