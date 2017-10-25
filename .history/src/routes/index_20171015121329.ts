import { NextFunction, Request, Response, Router } from "express";
var fs = require("fs");

import { BaseRoute } from "./route";
import { MoviesNames } from './../services/movies_names';
import { HTTP } from './../services/http';


/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log('[IndexRoute::create] Creating index route.');

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      // new IndexRoute().readFile(res)
      let mn = new MoviesNames()
      // new HTTP(mn)
      // res.end(new MoviesNames().doGetReq())
      // res.end(new HTTP(mn).getMovieNames())
      let j = JSON.parse('{"1":1, "2":2, "3":3}')
      res.end('j')
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | Tour of Heros";

    //set message
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };

    //render template
    this.render(req, res, "index", options);
  }

  public readFile(res: Response) {
    fs.readFile(this.getFilePath(), 'utf8', function (err, data) {
      if(err) {
        console.log(err);
      } else {
        res.end( data );
      }    
    });
  }

  public getFilePath() {
    return '/Users/redtailadmin/PersonalMobileProject/typescript-express-starter/src/data/movies.json'
  }

}
