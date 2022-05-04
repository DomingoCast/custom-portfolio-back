import { User } from "../../domain/user/user";
import registerUserUseCase from "./register-user.use-case";

describe("Regiter user use case", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("Given a user and user repository, should return a new user", async () => {
        const hashPassword = "654321";
        const user: Omit<User, "id"> = {
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
        };
        const userRepository: any = {
            persist: jest.fn(async () => await userSafe),
            findByEmail: jest.fn(async () => await null),
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
        expect(userRepository.persist).toHaveBeenCalledWith(newUser);
        expect(emailSender.send).toHaveBeenCalled();
    });

    it("Given a user and user repository, should return a null", async () => {
        const hashPassword = "654321";
        const user: Omit<User, "id"> = {
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
        const userRepository: any = {
            persist: jest.fn(async () => await userSafe),
            findByEmail: jest.fn(async () => await null),
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
        expect(userRepository.persist).toHaveBeenCalledWith(newUser);
        expect(emailSender.send).not.toHaveBeenCalled();
    });
});
