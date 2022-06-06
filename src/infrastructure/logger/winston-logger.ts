import { createLogger, transports } from "winston";
import { formatConsole, formatJson } from "./format-cases";

const folder = "./src/infrastructure/logger/logs";

const winston = createLogger({
    transports: [
        new transports.Console({
            format: formatConsole,
        }),
        new transports.File({
            level: "info",
            dirname: folder,
            filename: "combined.log",
            format: formatJson,
        }),
        new transports.File({
            level: "error",
            dirname: folder,
            filename: "error.log",
            format: formatJson,
        }),
    ],

    defaultMeta: {
        service: "domingocast",
    },
});
export default winston;
