import registerUserUseCase from "./register-user.use-case";

describe("registerUserUseCase", () => {
    it("saves user given a user repository", () => {
        const mockResponse = "x";
        const mockProps: any = {
            userRepository: {
                persist: jest.fn(() => mockResponse),
            },
        };
        const mockUser: any = "x";
        const response = registerUserUseCase(mockProps)(mockUser);
        expect(mockProps.userRepository.persist).toBeCalledWith(mockUser);
        expect(response).toBe(mockResponse);
    });
});
