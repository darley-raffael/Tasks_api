import { TasksModel } from "../model/TasksModel.js";

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
    const { title, description } = req.body;
    if (!title || !description) {
      res.statusCode = 400;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "All fields are required" }));
    }
    const task = await taskModel.create(title, description);
    res.statusCode = 201;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(task));
  }

  async show(req, res) {
    const queryParams = req.query;

    const tasks = await taskModel.show("tasks", queryParams);
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(tasks));
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
      res.statusCode = 400;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "All fields are required" }));
    }

    const taskIndex = await taskModel.update("tasks", id, {
      title,
      description,
    });
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ message: "Task updated", taskIndex }));
  }
}
