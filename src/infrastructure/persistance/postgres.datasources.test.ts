import { createDBConnection } from "./postgres.datasources";

describe("createDBConnection", () => {
    it("creates connection", async () => {
        const connection = createDBConnection();
        expect(connection).toHaveProperty("connect");
    });

    it("connects", async () => {
        const mockDataSource: any = {
            initialize: jest.fn(() => Promise.resolve()),
        };
        const { connect } = createDBConnection();
        await connect(mockDataSource);
        expect(mockDataSource.initialize).toHaveBeenCalled();
    });
});
