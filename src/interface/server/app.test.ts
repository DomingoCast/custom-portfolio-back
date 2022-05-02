import { runServer, createServer } from "./app";

describe("createServer", () => {
    it("creates server", async () => {
        const app = createServer(3000);
        expect(app).toHaveProperty("run");
    });
});

describe("runServer", () => {
    const mockApp: any = {
        listen: jest.fn(),
    };
    it("starts server", async () => {
        const port = 3001;
        try {
            const server = runServer(mockApp, port);
            console.log(server);
        } catch (err) {
            console.error(err);
        }
        expect(mockApp.listen).toHaveBeenCalled();
    });
});
