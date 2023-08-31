import { Database } from "../database/Database.js";
import { randomUUID } from "node:crypto";
const database = new Database();

export class TasksModel {
  /**
   * Creates a new task with the given title and description.
   *
   * @param {string} title - The title of the task.
   * @param {string} description - The description of the task.
   * @return {Promise} A promise that resolves with the newly created task data.
   */
  async create(title, description) {
    const task = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      update_at: "",
      completed_at: null,
      completed: false,
    };

    const data = await database.insert("tasks", task);

    return data;
  }

  async show(table, params) {
    if (!params || Object.keys(params).length === 0) {
      const data = await database.select(table);

      return data;
    }
    const data = await database.select(table, params);
    return data;
  }

  async update(table, id, data) {
    const taskIndex = database.update(table, id, data);
    return taskIndex;
  }

  async getById(id) {
    const data = await database.select("tasks", { id });
    return data;
  }

  async delete(table, id) {
    const taskIndex = database.delete(table, id);
    return taskIndex;
  }
}
