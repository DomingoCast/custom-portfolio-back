import createUserRepository from "./user.datasource";
jest.mock("../datasource", () => ({
    dataSource: {
        getRepository: () => ({ save: jest.fn(async (x) => await x) }),
    },
}));

describe("createUserRepository", () => {
    it("creates a repository given a data source", () => {
        expect(createUserRepository()).toHaveProperty("persist");
    });
    it("persists a user given a repository and a datasource", async () => {
        const user: any = {};
        const userRepository = createUserRepository();
        const response = await userRepository.persist(user);
        expect(response).toBe(user);
    });
});
