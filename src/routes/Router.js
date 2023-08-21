export class Router {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  /**
   * Adds a middleware function to the list of middlewares.
   *
   * @param {string|function} path - The path for the middleware. If it is a function, it is treated as the handler and the path defaults to "/".
   * @param {function} handler - The middleware function to be added.
   */
  use(path, handler) {
    if (typeof path === "function") {
      handler = path;
      path = "/";
    }
    this.middlewares.push({
      path,
      handler,
    });
  }

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
    let index = 0;

    const next = (err) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({ message: err.message }));
        return;
      }

      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        if (req.url.startsWith(middleware.path)) {
          middleware.handler(req, res, next);
        } else {
          next();
        }
      } else {
        const route = this.routes.find(
          (route) => route.method === req.method && route.path === req.url
        );

        if (route) {
          route.handler(req, res);
        } else {
          res.statusCode = 404;
          res.setHeader("Content-type", "application/json");
          res.end(JSON.stringify({ message: "Route not found" }));
        }
      }
    };

    next();
  }
}
