import { createServer } from "./interface/server/app";
import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { startApplication } from ".";

jest.mock("./interface/server/app", () => ({
    createServer: jest.fn(() => ({ run: jest.fn })),
}));
jest.mock("./infrastructure/persistance/postgres.datasources", () => ({
    createDBConnection: jest.fn(() => ({
        dataSource: null,
        connect: jest.fn(),
    })),
}));
const createServerMock = createServer as unknown as jest.Mock;
const createDBConnectionMock = createDBConnection as unknown as jest.Mock;

describe("unit tests", () => {
    it("calls every function when start application", () => {
        startApplication();
        expect(createServerMock).toHaveBeenCalledWith(3000);
        expect(createDBConnectionMock).toHaveBeenCalled();
    });
});
