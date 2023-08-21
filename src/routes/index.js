import { Router } from "./Router.js";
import routerTasks from "./task.router.js";

const routes = new Router();
console.log(routes);

routes.use(routerTasks);

export default routes;
