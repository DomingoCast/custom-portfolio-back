import { Role } from "../../domain/user/role.enum";
import { User } from "../../domain/user/user";
import passwordUserUseCase from "./pasword-user.use-case";

describe("Password user use case", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("Given a user and user repository, and a hash function it should return a new user", async () => {
        const password = "6543215";
        const id = "6";
        const userResponse = "";
        const user: User = {
            id: "test",
            name: "test",
            surname: "test",
            email: "test",
            password: "test",
            phone: "test",
            address: "test",
            role: Role.worker,
        };
        const userRepository: any = {
            findById: jest.fn(async () => await user),
            update: jest.fn(async () => await userResponse),
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
        expect(userRepository.update).toHaveBeenCalledWith({
            ...user,
            password,
        });
    });
});
