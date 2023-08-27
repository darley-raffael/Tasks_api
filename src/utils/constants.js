import { configDotenv } from "dotenv";
import { env } from "node:process";

configDotenv();

export const environment = {
  HOST: env.HOSTNAME || "127.0.0.1",
  PORT: env.PORT || 3000,
};
