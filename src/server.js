import { Router } from "./routes/Router.js";
import { configDotenv } from "dotenv";
import { env } from "node:process";
import http from "node:http";

configDotenv();

const router = new Router();
const PORT = env.PORT || 3000;
const HOST = env.HOSTNAME || "127.0.0.1";

router.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify({ message: "raffa" }));
});

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);