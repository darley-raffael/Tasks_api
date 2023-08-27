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
    };

    const data = await database.insert("tasks", task);

    return data;
  }

  async show(table, params) {
    if (!params) {
      const data = await database.select(table);

      return data;
    }
    const data = await database.select(table, params);
    return data;
  }
}
