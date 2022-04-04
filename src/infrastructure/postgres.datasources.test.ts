import { createDBConnection } from "./postgres.datasources";

describe("createDBConnection", () => {
    it("creates connection", async () => {
        const connection = createDBConnection();
        expect(connection).toHaveProperty("connect");
    });

    // I don't know how to test because it cant connect w/o docker

    // it("connects", async () => {
    //     console.log = jest.fn();
    //     createDBConnection().connect();
    //     expect(console.log).toHaveBeenCalledWith(
    //         "Data Source has been initialized!"
    //     );
    // });
});
