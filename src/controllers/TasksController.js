import { statusHttpServer } from "../utils/http-server.js";
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
    const statusHttp = statusHttpServer(req, res);
    const { title, description } = req.body;
    if (!title || !description) {
      statusHttp(400, { message: "All fields are required" });

      return;
    }
    const task = await taskModel.create(title, description);
    statusHttp(201, task);
  }

  async show(req, res) {
    const statusHttp = statusHttpServer(req, res);
    const queryParams = req.query;

    const tasks = await taskModel.show("tasks", queryParams);

    statusHttp(200, tasks);
  }

  async update(req, res) {
    const statusHttp = statusHttpServer(req, res);
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
      statusHttp(400, { message: "All fields are required" });
      return;
    }

    const task = await taskModel.getById(id);

    if (!task || task.length === 0) {
      statusHttp(404, { message: "Task not found" });
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
    statusHttp(200, { message: "Task updated", taskIndex });
  }

  async delete(req, res) {
    const statusHttp = statusHttpServer(req, res);
    const { id } = req.params;
    if (!id) {
      statusHttp(400, { message: "Task id is required" });
      return;
    }

    const searchTask = await taskModel.getById(id);

    if (!searchTask || searchTask.length === 0) {
      statusHttp(404, { message: "Task not found" });
      return;
    }
    await taskModel.delete("tasks", id);

    statusHttp(200, { message: "Task deleted", taskId: searchTask[0].id });
    return searchTask;
  }

  async updateStatus(req, res) {
    const statusHttp = statusHttpServer(req, res);
    const { id } = req.params;
    if (!id) {
      statusHttp(400, { message: "Task id is required" });
      return;
    }

    const searchTask = await taskModel.getById(id);

    if (!searchTask || searchTask.length === 0) {
      statusHttp(404, { message: "Task not found" });
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

    statusHttp(200, { message: "Task updated", task });

    return task;
  }
}
