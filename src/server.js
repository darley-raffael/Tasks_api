import { environment } from "./utils/constants.js";
import routes from "./routes/index.js";
import http from "node:http";

const { HOST, PORT } = environment;

const server = http.createServer((req, res) => {
  console.log(req.url.match(/^\/tasks\/(?<id>[a-z0-9\-_]+)\/?/));
  routes.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
