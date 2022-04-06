import { runServer } from "./app";

describe("createServer", () => {
    // it("creates server", async () => {
    //     const app = createServer(3000);
    //     expect(app).toHaveProperty("run");
    // });
});

describe("runServer", () => {
    const mockApp: any = {
        listen: jest.fn(),
    };
    it("starts server", async () => {
        const port = 3001;
        runServer(mockApp, port);
        expect(mockApp.listen).toHaveBeenCalled();
    });
});
