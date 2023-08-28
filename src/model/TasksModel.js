import { Database } from "../database/Database.js";
import { randomUUID } from "node:crypto";
const database = new Database();

export class TasksModel {
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
}
