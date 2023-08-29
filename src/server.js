import { queryString } from "./utils/query_string.js";
import { environment } from "./utils/constants.js";
import { json } from "./middlewares/json.js";
import routes from "./routes/index.js";
import http from "node:http";
const { HOST, PORT } = environment;

const server = http.createServer(async (req, res) => {
  await json(req, res);
  const route = await routes.instanceRoutesServer(req, res);

  if (route) {
    const routeParams = req.url.match(route.path);
    const { ...params } = routeParams.groups ? routeParams.groups : {};
    req.params = params;
  }

  req.query = (await queryString(req.url)) ?? {};

  routes.handleRequest(req, res, route);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
