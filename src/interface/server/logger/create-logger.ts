import { createLogger, transports, format } from "winston";

const formatJson = format.combine(
    format.json(),
    format.simple(),
    format.timestamp(),
    format.json()
);

const formatConsole = format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] ${service} ${level}: ${JSON.stringify(message)}`;
    })
);

const logger = createLogger({
    transports: [
        new transports.Console({
            format: formatConsole,
        }),
        new transports.File({
            level: "info",
            dirname: "./src/interface/server/logger/logs",
            filename: "combined.log",
            format: formatJson,
        }),
        new transports.File({
            level: "error",
            dirname: "./src/interface/server/logger/logs",
            filename: "error.log",
            format: formatJson,
        }),
    ],

    defaultMeta: {
        service: "TeamDHA",
    },
});
export default logger;
