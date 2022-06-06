import winston from "./winston-logger";
import getLogger from "./get-logger";

describe("Test for logger", () => {
    it("Check the function initLogger", () => {
        expect(winston).toBeDefined();
    });
    it("Check name of service", () => {
        expect(winston.defaultMeta.service).toEqual("domingocast");
    });
    it("Check function logger", () => {
        expect(getLogger).toBeDefined();
    });
    it("Check pass info logg", () => {
        const log = getLogger().info("This is info logg");
        expect(log.writable).toEqual(true);
    });
    it("Check pass error logg", () => {
        const log = getLogger().error("This is error logg");
        expect(log.writable).toEqual(true);
    });
});
