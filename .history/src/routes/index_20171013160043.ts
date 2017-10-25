import { NextFunction, Request, Response, Router } from "express";
var fs = require("fs");

import { BaseRoute } from "./route";


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
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().readMoviesJsonFile(res);
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

  public readMoviesJsonFile(res: Response) {
    console.log('readMoviesJsonFile() is called');
    console.log(__dirname);
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
        res.end( {
          "id": 1, 
          "title": "Raees",
          "url": "http://t2.gstatic.com/images?q=tbn:ANd9GcS4PwRgsY3SW8N-y6XkBrsusLKN79p5KFWwhuXBWZyG-YUhpLIb",
          "cast": [
            "Shah Rukh Khan", 
            "Mahira Khan", 
            "Nawazuddin Siddiqui", 
            "Mohammed Zeeshan Ayyub", 
            "Sheeba Chaddha, S",
            "hubham Chintamani" 
          ],
          "genre": "Crime/Action",
          "studio": [
            "Red Chillies Entertainment",
            "Excel Entertainment"
          ]
        } );
    });
  }
}