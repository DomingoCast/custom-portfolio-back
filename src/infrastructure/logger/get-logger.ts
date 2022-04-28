import winston from "./winston-logger";

const getLogger = () => {
    const info = (message: String) => {
        return winston.info(message);
    };
    const error = (message: String) => {
        return winston.error(message);
    };
    return {
        info,
        error,
    };
};

export default getLogger;
