import passwordUserUseCase from "./pasword-user.use-case";

describe("Password user use case", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("Given a user and user repository, and a hash function it should return a new user", async () => {
        const password = "6543215";
        const id = "6";
        const userResponse = "";
        const userRepository: any = {
            findById: jest.fn(async () => await true),
            updatePassword: jest.fn(async () => await userResponse),
        };
        const hashFunction: any = {
            hash: jest.fn(async () => await password),
        };
        const emailSender: any = {
            send: jest.fn(),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
            emailSender,
        };
        const result = await passwordUserUseCase(mockProps)(id, password);
        expect(result).toStrictEqual(userResponse);
        expect(hashFunction.hash).toHaveBeenCalled();
        expect(userRepository.findById).toHaveBeenCalledWith(id);
        expect(userRepository.updatePassword).toHaveBeenCalledWith(
            id,
            password
        );
    });
});
