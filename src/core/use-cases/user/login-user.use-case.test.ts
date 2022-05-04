import { User } from "../../domain/user/user";
import loginUserUseCase from "./login-user.use-case";

describe("Login user use case", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("Given a user and user repository and a hash function, if everything works it should return a new user", async () => {
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
            findByEmail: jest.fn(async () => await userSafe),
        };
        const hashFunction: any = {
            verify: jest.fn(async () => await true),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
        };
        const result = await loginUserUseCase(mockProps)(user);
        expect(result).toStrictEqual(userSafe);
        expect(hashFunction.verify).toHaveBeenCalled();
        expect(userRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    });
    it("Given a user and user repository and a hash function, if email in database it doesn't return", async () => {
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
        const userRepository: any = {
            findByEmail: jest.fn(async () => await null),
        };
        const hashFunction: any = {
            verify: jest.fn(async () => await true),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
        };
        let result = null;
        try {
            result = await loginUserUseCase(mockProps)(user);
        } catch (err) {}
        expect(result).toStrictEqual(null);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    });
    it("Given a user and user repository and a hash function, if email in database it doesn't return", async () => {
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
            findByEmail: jest.fn(async () => await userSafe),
        };
        const hashFunction: any = {
            verify: jest.fn(async () => await false),
        };

        const mockProps: any = {
            userRepository,
            hashFunction,
        };
        let result = null;
        try {
            result = await loginUserUseCase(mockProps)(user);
        } catch (err) {}
        expect(result).toStrictEqual(null);
        expect(hashFunction.verify).toHaveBeenCalled();
        expect(userRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    });
});
