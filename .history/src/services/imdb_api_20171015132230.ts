
export class IMDB {
  //http://www.omdbapi.com/?t=raees&y=2017&apikey=BanMePlz
  baseurl: string;
  apikey: string;

  constructor() {
    this.baseurl = 'http://www.omdbapi.com/';
    this.apikey = 'BanMePlz';

  }

  getUrl(moviename) {
    return `${this.baseurl}?t=${moviename}&y=2017&apikey=${this.apikey}`
  }

  logError(url) {
    console.log(`Error: Unable to hit the URL[${url}]`)
  }

}
