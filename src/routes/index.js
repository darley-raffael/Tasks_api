import { Router } from "./Router.js";
import routerTasks from "./task.router.js";

const routes = new Router();

routes.use("/tasks", routerTasks);
export default routes;
