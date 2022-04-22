import UserRepository from "../ports/user-repository.port";
import registerUser from "./register-user";
import createHashFunction from "../../infrastructure/password/create-hash-function";
import { User } from "../domain/user/User";

jest.mock("../../infrastructure/password/create-hash-function", () =>
    jest.fn()
);

const createHashFunctionMock = createHashFunction as unknown as jest.Mock;

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
        const userRepository: UserRepository = {
            persist: jest.fn(async () => await userSafe),
        };

        createHashFunctionMock.mockImplementation(() => {
            return {
                hash: async () => hashPassword,
            };
        });

        const result = await registerUser(user, userRepository);
        expect(result).toStrictEqual(userSafe);
        expect(createHashFunctionMock).toHaveBeenCalled();
        expect(userRepository.persist).toHaveBeenCalledWith(newUser);
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
        const userRepository: UserRepository = {
            persist: jest.fn(async () => await userSafe),
        };

        createHashFunctionMock.mockImplementation(() => {
            return {
                hash: async () => hashPassword,
            };
        });

        const result = await registerUser(user, userRepository);
        expect(result).toStrictEqual(userSafe);
        expect(createHashFunctionMock).toHaveBeenCalled();
        expect(userRepository.persist).toHaveBeenCalledWith(newUser);
    });
});
