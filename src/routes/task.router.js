import { TasksController } from "../controllers/TasksController.js";
import { Router } from "./Router.js";

const tasksController = new TasksController();
const routerTasks = new Router();

routerTasks.post("/", tasksController.create);
routerTasks.get("/", tasksController.show);
routerTasks.put("/:id", tasksController.update);
routerTasks.delete("/:id", tasksController.delete);
routerTasks.patch("/:id/complete", tasksController.updateStatus);

export default routerTasks;
