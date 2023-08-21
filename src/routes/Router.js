export class Router {
  constructor() {
    this.routes = [];
  }

  /**
   * Adds a new route to the list of routes.
   * @param {string} path - The path for the new route.
   * @param {function} functionHandler - The function handler for the new route.
   */
  // use(path, functionHandler) {
  //   this.routes.push({
  //     path,
  //     functionHandler,
  //   });
  // }

  /**
   * Adds a new route with a GET method to the route table.
   * @param {string} path - The path for the route.
   * @param {function} handler - The handler function for the route.
   * @return {void} This function does not return a value.
   */
  get(path, handler) {
    this.routes.push({
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
    this.routes.push({
      method: "POST",
      path,
      handler,
    });
  }

  /**
   * Adds a new route with a PATCH method to the route table.
   * @param {string} path - The path for the route.
   * @param {function} handler - The handler function for the route.
   * @return {void} This function does not return a value.
   */
  patch(path, handler) {
    this.routes.push({
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
    this.routes.push({
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
    this.routes.push({
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
    const routes = this.routes.find(
      (routes) => routes.method === req.method && routes.path === req.url
    );

    if (routes) {
      routes.handler(req, res);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
}
