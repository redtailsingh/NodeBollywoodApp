import * as rp from 'request-promise'

export interface Options {
  uri: string;
  transform: any;
}

export class Http {

  makeRequest(options: Options): Promise<any> {
    return rp(options);
  }

}
