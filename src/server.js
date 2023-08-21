import { configDotenv } from "dotenv";
import { env } from "node:process";
import http from "node:http";

configDotenv();

const PORT = env.PORT || 3000;
const HOST = env.HOSTNAME || "127.0.0.1";

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(PORT, HOST, () =>
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
