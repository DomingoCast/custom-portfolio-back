import loggerInit from "./init-logger";
import logger from "./create-logger";
const infoMessage = { "This is info logg": "info" };
const errorMessage = { "This is error logg": "error" };

describe("Test for logger", () => {
    it("Check the function initLogger", () => {
        expect(loggerInit).toBeDefined();
    });
    it("Check name of service", () => {
        expect(loggerInit.defaultMeta.service).toEqual("TeamDHA");
    });
    it("Check pass info logg", () => {
        const log = loggerInit.info(infoMessage);
        expect(log.level).toEqual("info");
    });
    it("Check pass error logg", () => {
        const log = loggerInit.error(errorMessage);
        expect(log.level).toEqual("info");
    });
    it("Check function logger", () => {
        expect(logger).toBeDefined();
    });
    it("Check pass info logg", () => {
        const log = logger.info(infoMessage);
        debugger
        expect(log.level).toEqual("info");
    });
    it("Check pass error logg", () => {
        const log = logger.error(errorMessage);
        expect(log.level).toEqual("info");
    });
});
