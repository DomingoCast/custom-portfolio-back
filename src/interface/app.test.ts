import { runServer, createServer } from "./app";

describe("Set up", () => {
    it("creates server", async () => {
        const app = createServer(3000);
        expect(app).toHaveProperty("run");
    });

    const mockApp: any = {
        listen: jest.fn(),
    };
    it("starts server", async () => {
        const port = 3001;
        runServer(mockApp, port);
        expect(mockApp.listen).toHaveBeenCalled();
    });
});
