import { RegisterInfo } from "../../domain/user/register-info";
import { User } from "../../domain/user/user";
import UserRepository from "../../ports/user-repository.port";
import registerUserUseCase from "./register-user.use-case";

describe("Regiter user use case", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("Given a user and user repository, should return a new user", async () => {
        const hashPassword = "654321";
        const user: RegisterInfo = {
            name: "",
            surname: "",
            password: "123456",
            email: "",
            phone: "",
            address: "",
        };
        const newUser = {
            ...user,
            password: hashPassword,
        };
        const userSafe: User = {
            ...newUser,
            id: "",
            role: "worker",
        };
        const userRepository: UserRepository = {
            persist: jest.fn(async () => await userSafe),
        };
        const hashFunction: any = {
            hash: jest.fn(async () => await hashPassword),
        };
        const emailSender: any = {
            send: jest.fn(),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
            emailSender,
        };
        const result = await registerUserUseCase(mockProps)(user);
        expect(result).toStrictEqual(userSafe);
        expect(hashFunction.hash).toHaveBeenCalled();
        expect(userRepository.persist).toHaveBeenCalledWith({
            ...newUser,
            role: "worker",
        });
        expect(emailSender.send).toHaveBeenCalled();
    });

    it("Given a user and user repository, should return a null", async () => {
        const hashPassword = "654321";
        const user: RegisterInfo = {
            name: "",
            surname: "",
            password: "123456",
            email: "",
            phone: "",
            address: "",
        };
        const newUser = {
            ...user,
            password: hashPassword,
        };
        const userSafe: null = null;
        const userRepository: UserRepository = {
            persist: jest.fn(async () => await userSafe),
        };
        const hashFunction: any = {
            hash: jest.fn(async () => await hashPassword),
        };
        const emailSender: any = {
            send: jest.fn(),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
            emailSender,
        };
        const result = await registerUserUseCase(mockProps)(user);
        expect(result).toStrictEqual(userSafe);
        expect(hashFunction.hash).toHaveBeenCalled();
        expect(userRepository.persist).toHaveBeenCalledWith({
            ...newUser,
            role: "worker",
        });
        expect(emailSender.send).not.toHaveBeenCalled();
    });
});
