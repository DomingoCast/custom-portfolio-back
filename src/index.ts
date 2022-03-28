import { runServer, createServer } from "./interface/app";

const port = Number(process.env.PORT) || 3000;

runServer(createServer(), port);
