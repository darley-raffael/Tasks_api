import { environment } from "../utils/constants.js";
import { extractRouteParams } from "../utils/build-route-path.js";
import { queryString } from "../utils/query_string.js";

const { HOST, PORT } = environment;

export class Router {
  #routes;
  #middlewares;
  constructor() {
    this.#routes = [];
    this.#middlewares = [];
  }

  /**
   * Get the routes.
   *
   * @return {type} The routes.
   */
  get routes() {
    return this.#routes;
  }

  /**
   * Use the specified path and router to add routes to the list of routes.
   *
   * @param {string} path - The base path for the routes.
   * @param {object} router - The router object containing the routes to be added.
   */
  use(path, router) {
    for (const route of router.routes) {
      this.#routes.push({
        method: route.method,
        path: extractRouteParams(path.concat(`${route.path}?`)),
        handler: route.handler,
      });
    }
  }

  /**
   * Adds a new route with a GET method to the route table.
   * @param {string} path - The path for the route.
   * @param {function} handler - The handler function for the route.
   * @return {void} This function does not return a value.
   */
  get(path, handler) {
    this.#routes.push({
      method: "GET",
      path,
      handler,
    });
  }

  /**
   * Adds a new route with a POST method to the route table.
   * @param {string} path - The path for the route.
   * @param {function} handler - The handler function for the route.
   * @return {void} This function does not return a value.
   */
  post(path, handler) {
    this.#routes.push({
      method: "POST",
      path,
      handler,
    });
  }

  /**
   * Add a new route with the PATCH method.
   *
   * @param {string} path - The path of the route.
   * @param {function} handler - The handler function for the route.
   */
  patch(path, handler) {
    this.#routes.push({
      method: "PATCH",
      path,
      handler,
    });
  }

  /**
   * Adds a new route with a PUT method to the route table.
   * @param {string} put - The path for the route.
   * @param {function} handler - The handler function for the route.
   * @return {void} This function does not return a value.
   */
  put(path, handler) {
    this.#routes.push({
      method: "PUT",
      path,
      handler,
    });
  }

  /**
   * Deletes a route from the route list.
   * @param {string} path - The path of the route to be deleted.
   * @param {function} handler - The handler function of the route to be deleted.
   */
  delete(path, handler) {
    this.#routes.push({
      method: "DELETE",
      path,
      handler,
    });
  }

  /**
   * Finds and returns the route that matches the request method and URL path.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {object} The matching route object, or undefined if no match is found.
   */
  async instanceRoutesServer(req, res) {
    const { method, url } = req;

    const route = this.#routes.find(
      (route) =>
        route.method === method &&
        route.path.exec(url) &&
        route.path.exec(url)[0] === url
    );

    return route;
  }

  /**
   * Handles the request and sends the appropriate response based on the route.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  handleRequest(req, res, route) {
    if (route) {
      console.log("Route valid");
      route.handler(req, res);
    } else {
      console.log("Route not found");
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
}
