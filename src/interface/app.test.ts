import { createServer } from "./app";

describe("createServer", () => {
    it("creates server", async () => {
        const app = createServer(3000);
        expect(app).toHaveProperty("run");
    });
});
