import { createServer } from "./interface/app";

const axios = require("axios");

describe("start the server", () => {
    it("starts on 3000", async () => {
        const server = createServer(3000).run();
        const response = await axios.get("http://localhost:3000");
        expect(response.status).toBe(200);
        server?.close();
    });
});
