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
        path: path + route.path,
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
   * @param {string} path - The path for the route.
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
   * Handles the request and sends the appropriate response based on the route.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  handleRequest(req, res) {
    // Normalize the URL
    const normalizeUrl = req.url.endsWith("/") ? req.url.slice(0, -1) : req.url;

    // Find the route
    const route = this.#routes.find(
      (route) =>
        route.method === req.method &&
        route.path.replace(/\/$/, "") === normalizeUrl
    );
    if (route) {
      route.handler(req, res);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
}
