import { TasksModel } from "../model/TasksModel.js";
import { queryString } from "../utils/query_string.js";

const taskModel = new TasksModel();

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
    req.on("end", async () => {
      const data = JSON.parse(body);
      const { title, description } = data;

      if (!title || !description) {
        res.statusCode = 400;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({ message: "All fields are required" }));
      } else {
        res.statusCode = 201;
        res.setHeader("Content-type", "application/json");
        const task = await taskModel.create(title, description);
        res.end(
          JSON.stringify({
            message: "Task created",
            task: { id: task.id, title: task.title },
          })
        );
      }
    });
  }

  async show(req, res) {
    const queryParams = queryString(req.url);
    const tasks = await taskModel.show("tasks", queryParams);
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(tasks));
  }
}
