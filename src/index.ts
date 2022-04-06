import { createDBConnection } from "./infrastructure/postgres.datasources";
import { createServer } from "./interface/server/app";
const awilix = require("awilix");

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});
container.register({});
// container.loadModules(["core/ports/*.repository.ts"], {
//     resolverOptions: {
//         lifetime: Lifetime.SINGLETON,
//     },
// });

const PORT = Number(process.env.PORT) || 3000;

createServer(PORT).run();
createDBConnection().connect();
