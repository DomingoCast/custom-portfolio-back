import loggerInit from "./init-logger";
import getLogger from "./get-logger";

describe("Test for logger", () => {
    it("Check the function initLogger", () => {
        expect(loggerInit).toBeDefined();
    });
    it("Check name of service", () => {
        expect(loggerInit.defaultMeta.service).toEqual("TeamDHA");
    });
    it("Check function logger", () => {
        expect(getLogger).toBeDefined();
    });
    it("Check pass info logg", () => {
        const log = getLogger().info({ message: "This is info logg" });
        expect(log.writable).toEqual(true);
    });
    it("Check pass error logg", () => {
        const log = getLogger().error({ message: "This is error logg" });
        expect(log.writable).toEqual(true);
    });
});
