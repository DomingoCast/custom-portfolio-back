import { Role } from "../../core/domain/user/role.enum";
import UnauthorizedError from "../../core/errors/unauthorized.error";
import validateAdmin from "./validate-admin";

describe("validate admin", () => {
    it("throws unauthorized error if no token", () => {
        const req: any = {
            headers: {},
            container: {
                cradle: {
                    accessToken: {
                        verify: jest.fn((x) => x),
                    },
                },
            },
        };
        const res: any = "";
        const next = jest.fn();
        try {
            validateAdmin(req, res, next);
        } catch (e) {
            expect(e).toBeInstanceOf(UnauthorizedError);
        }
    });
    it("throws unauthorized error if token not valid", () => {
        const req: any = {
            headers: { token: "" },
            container: {
                cradle: {
                    accessToken: {
                        verify: jest.fn((x) => {
                            throw new Error();
                        }),
                    },
                },
            },
        };
        const res: any = "";
        const next = jest.fn();
        try {
            validateAdmin(req, res, next);
        } catch (e) {
            expect(e).toBeInstanceOf(UnauthorizedError);
        }
    });
    it("throws unauthorized error if token not valid role", () => {
        const req: any = {
            headers: { token: "token" },
            container: {
                cradle: {
                    accessToken: {
                        verify: jest.fn((x) => ({
                            data: { role: Role.worker },
                        })),
                    },
                },
            },
        };
        const res: any = "";
        const next = jest.fn();
        try {
            validateAdmin(req, res, next);
        } catch (e) {
            expect(e).toBeInstanceOf(UnauthorizedError);
        }
    });
    it("calls next if token and role valid", () => {
        const req: any = {
            headers: { token: "token" },
            container: {
                cradle: {
                    accessToken: {
                        verify: jest.fn((x) => ({
                            data: { role: Role.admin },
                        })),
                    },
                },
            },
        };
        const res: any = "";
        const next = jest.fn();
        validateAdmin(req, res, next);
        expect(next).toBeCalled();
    });
});
