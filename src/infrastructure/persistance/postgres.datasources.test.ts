import { createDBConnection } from "./postgres.datasources";
import runSeed from "./seed";

const runSeedMock = runSeed as unknown as jest.Mock;

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
