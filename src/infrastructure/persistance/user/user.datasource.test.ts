import createUserRepository from "./user.datasource";

describe("createUserRepository", () => {
    it("creates a repository", () => {
        const mockDs: any = {
            dataSource: {
                getRepository: jest.fn(),
            },
        };
        expect(createUserRepository(mockDs)).toHaveProperty("persist");
    });
    it("persists", async () => {
        const user: any = {};
        const mockDs: any = {
            dataSource: {
                getRepository: jest.fn((x) => ({
                    save: jest.fn(async (x) => await user),
                })),
            },
        };
        const userRepository = createUserRepository(mockDs);
        const response = await userRepository.persist(user);
        expect(response).toBe(user);
    });
});
