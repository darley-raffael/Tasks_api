import { queryString } from "./utils/query_string.js";
import { environment } from "./utils/constants.js";
import { json } from "./middlewares/json.js";
import routes from "./routes/index.js";
import http from "node:http";

const { HOST, PORT } = environment;

const server = http.createServer(async (req, res) => {
  await json(req, res);
  const routeParams = req.url.match(routes.routes[0].path);
  const { ...params } = routeParams.groups ?? {};
  req.params = params;
  req.query = queryString(req.url) ?? {};

  routes.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
