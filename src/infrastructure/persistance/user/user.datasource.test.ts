import createUserRepository from "./user.datasource";

describe("createUserRepository", () => {
    it("creates a repository given a data source", () => {
        const mockDs: any = {
            getRepository: jest.fn,
        };
        expect(createUserRepository(mockDs)).toHaveProperty("persist");
    });
    it("persists a user given a repository and a datasource", async () => {
        const user: any = {};
        const mockDs: any = {
            getRepository: jest.fn((x) => ({
                save: jest.fn(async (x) => await user),
            })),
        };
        const userRepository = createUserRepository(mockDs);
        const response = await userRepository.persist(user);
        expect(response).toBe(user);
    });
});
