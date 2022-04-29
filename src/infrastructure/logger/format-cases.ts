import { format } from "winston";

export const formatConsole = format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] ${service} ${level}: ${JSON.stringify(message)}`;
    })
);
export const formatJson = format.combine(
    format.json(),
    format.simple(),
    format.timestamp(),
    format.json()
);
export default { formatConsole, formatJson };
