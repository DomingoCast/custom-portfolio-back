import { runServer, createServer } from "./app";
const axios = require("axios");

describe("Set up", () => {
    it("creates server", async () => {
        const app = createServer(3000);
        expect(app).toHaveProperty("run");
    });

    it("starts server", async () => {
        const port = 3001;
        const app = createServer(300).app;
        runServer(app, port);
        const response = await axios.get("http://localhost:" + port);
        expect(response.status).toBe(200);
    });
});
