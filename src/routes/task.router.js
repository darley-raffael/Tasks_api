import { TasksController } from "../controllers/TasksController.js";
import { Router } from "./Router.js";

const tasksController = new TasksController();
const routerTasks = new Router();

routerTasks.post("/", tasksController.create);

export default routerTasks;
