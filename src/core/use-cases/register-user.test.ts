import registerUser from "./register-user";

describe("regiter user case", () => {
    it("registers", () => {
        const user: any = null;
        const userRepository = {
            persist: jest.fn((x) => user),
        };
        expect(registerUser(user, userRepository)).toBe(user);
    });
});
