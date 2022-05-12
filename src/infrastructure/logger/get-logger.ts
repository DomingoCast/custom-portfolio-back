import winston from "./winston-logger";

const getLogger = () => {
    const info = (message: string) => {
        return winston.info(message);
    };
    const error = (message: string) => {
        return winston.error(message);
    };
    return {
        info,
        error,
    };
};

export default getLogger;
