import registerUser from "./register-user";

describe("regiter user case", () => {
    it("registers", async () => {
        const user: any = {
            password: "****************",
        };
        const userRepository = {
            persist: jest.fn(async (x) => await user),
        };
        const result = await registerUser(user, userRepository);
        expect(result).toBe(user);
    });
});
