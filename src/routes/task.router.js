import { TasksController } from "../controllers/TasksController.js";
import { Router } from "./Router.js";

const tasksController = new TasksController();
const routerTasks = new Router();

console.log(tasksController);

routerTasks.post("/", tasksController.create);

console.log(routerTasks);

export default routerTasks;
