import { configDotenv } from "dotenv";
import { env } from "node:process";
import routes from "./routes/index.js";
import http from "node:http";

configDotenv();

const HOST = env.HOSTNAME || "127.0.0.1";
const PORT = env.PORT || 3000;

const server = http.createServer((req, res) => {
  routes.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
