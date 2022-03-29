import { createServer } from "./interface/app";

const PORT = Number(process.env.PORT) || 3000;

createServer(PORT).run();