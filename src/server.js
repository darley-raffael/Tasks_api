import { Router } from "./routes/Router.js";
import { configDotenv } from "dotenv";
import { env } from "node:process";
import http from "node:http";
import routes from "./routes/index.js";

configDotenv();

const HOST = env.HOSTNAME || "127.0.0.1";
const PORT = env.PORT || 3000;
const router = new Router();
console.log(routes);
router.use(routes);
const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
