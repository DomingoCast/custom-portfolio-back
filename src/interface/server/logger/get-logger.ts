import winston from "./init-logger";

const getLogger = () => {
    const info = (message: Object) => {
        return winston.info(message);
    };
    const error = (message: Object) => {
        return winston.error(message);
    };
    return {
        info,
        error,
    };
};

export default getLogger;
