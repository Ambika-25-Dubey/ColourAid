import env from "./env.js";

const serverConfig = {
  port: Number(env.PORT),
  env: env.NODE_ENV,
};

export default serverConfig;
