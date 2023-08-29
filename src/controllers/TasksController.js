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
      res.end(JSON.stringify({ message: "All fields are required" }));
      return;
    }

    const task = await taskModel.getById(id);

    if (!task || task.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Task not found" }));
      return;
    }

    const taskIndex = await taskModel.update("tasks", id, {
      title,
      description,
      created_at: task[0].created_at,
      updated_at: new Date(),
      completed_at: task[0].completed_at,
      completed: task[0].completed,
    });
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Task updated", taskIndex }));
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Task id is required" }));
      return;
    }

    const searchTask = await taskModel.getById(id);

    if (!searchTask || searchTask.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Task not found" }));
      return;
    }
    await taskModel.delete("tasks", id);
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(
      JSON.stringify({ message: "Task deleted", taskId: searchTask[0].id })
    );

    return searchTask;
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Task id is required" }));
      return;
    }

    const searchTask = await taskModel.getById(id);

    if (!searchTask || searchTask.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: "Task not found" }));
      return;
    }

    const { ...task } = searchTask[0];

    await taskModel.update("tasks", id, {
      title: task.title,
      description: task.description,
      created_at: task.created_at,
      updated_at: task.updated_at === "" ? new Date() : task.updated_at,
      completed_at: new Date(),
      completed: !task.completed,
    });

    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ message: "Task updated", task }));

    return task;
  }
}
