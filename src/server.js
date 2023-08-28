import { queryString } from "./utils/query_string.js";
import { environment } from "./utils/constants.js";
import { json } from "./middlewares/json.js";
import routes from "./routes/index.js";
import http from "node:http";

const { HOST, PORT } = environment;

const server = http.createServer(async (req, res) => {
  await json(req, res);

  console.log(routes.routes.path);
  const routeParams = req.url.match(routes.routes.path);
  console.log("route", routeParams);

  req.query = (await queryString(req.url)) ?? {};

  routes.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
