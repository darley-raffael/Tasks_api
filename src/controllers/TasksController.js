export class TasksController {
  /**
   * Create a new task.
   *
   * @param {Object} req - the request object
   * @param {Object} res - the response object
   * @return {void}
   */
  async create(req, res) {
    let body = "";

    req.setEncoding("utf-8");
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      const { title, description } = data;

      if (!title || !description) {
        res.statusCode = 400;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({ message: "All fields are required" }));
      } else {
        res.statusCode = 201;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({ message: "Task created" }));
      }
    });
  }
}
